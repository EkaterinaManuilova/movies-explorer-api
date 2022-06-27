const userRouter = require('express').Router();

const {
  getMyProfile,
  updateMyProfile,
} = require('../controllers/users');
const updateMyProfileValidation = require('../middlewares/validations');

userRouter.get('/me', getMyProfile);

userRouter.patch('/me', updateMyProfileValidation, updateMyProfile);

module.exports = userRouter;
