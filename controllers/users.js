const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  secretKey,
  incorrectData,
  mongoDuplicateKey,
  incorrectEmailOrPass,
  userNotFound,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, email: user.email, id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(mongoDuplicateKey));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretKey,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(incorrectEmailOrPass));
    });
};

module.exports.getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(userNotFound));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateMyProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(userNotFound));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === ('ValidationError' || 'CastError')) {
        next(new ValidationError(incorrectData));
      } else if (err.code === 11000) {
        next(new ConflictError(mongoDuplicateKey));
      } else {
        next(err);
      }
    });
};
