const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);

router.use('/users', userRouter);

router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не  найдена'));
});

module.exports = router;
