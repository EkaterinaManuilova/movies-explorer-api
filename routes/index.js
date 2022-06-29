const router = require('express').Router();
const { createUserValidation, loginUserValidation } = require('../middlewares/validations');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

const { pageNotFound } = require('../utils/constants');

router.post('/signup', createUserValidation, createUser);

router.post('/signin', loginUserValidation, loginUser);

router.use('/users', auth, userRouter);

router.use('/movies', auth, movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(pageNotFound));
});

module.exports = router;
