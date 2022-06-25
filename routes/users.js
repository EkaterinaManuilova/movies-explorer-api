const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMyProfile,
  updateMyProfile,
} = require('../controllers/users');

userRouter.get('/me', getMyProfile);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  }),
}), updateMyProfile);

module.exports = userRouter;
