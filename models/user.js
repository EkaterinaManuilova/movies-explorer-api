const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Обязательное поле'],
    unique: true,
    validate: [validator.isEmail, 'Не правильно указан email'],
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Имя пользователя должно содержать не менее 2-х символов'],
    maxlength: [30, 'Имя пользователя должно содержать не более 30-ти символов'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error({ message: 'Не правильные почта или пароль' }));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error({ message: 'Не правильные почта или пароль' }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
