const mongoose = require('mongoose');
const validator = require('validator');

const {
  incorrectUrl,
  requiredField,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, requiredField],
  },
  director: {
    type: String,
    required: [true, requiredField],
  },
  duration: {
    type: Number,
    required: [true, requiredField],
  },
  year: {
    type: String,
    required: [true, requiredField],
  },
  description: {
    type: String,
    required: [true, requiredField],
  },
  image: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: incorrectUrl,
    },
  },
  trailerLink: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: incorrectUrl,
    },
  },
  thumbnail: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: incorrectUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, requiredField],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, requiredField],
  },
  nameRU: {
    type: String,
    required: [true, requiredField],
  },
  nameEN: {
    type: String,
    required: [true, requiredField],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
