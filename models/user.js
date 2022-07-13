const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const {
  requiredField,
  incorrectEmail,
  incorrectEmailOrPass,
  minUserName,
  maxUserName,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, requiredField],
    unique: true,
    validate: [validator.isEmail, incorrectEmail],
  },
  password: {
    type: String,
    required: [true, requiredField],
    select: false,
  },
  name: {
    type: String,
    required: [true, requiredField],
    minlength: [2, minUserName],
    maxlength: [30, maxUserName],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(incorrectEmailOrPass));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(incorrectEmailOrPass));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
