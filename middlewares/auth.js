const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { secretKey, needAuthorization } = require('../utils/constants');

const handleAuthError = (next) => {
  next(new UnauthorizedError(needAuthorization));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};
