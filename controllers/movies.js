const Movie = require('../models/movie');
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (String(req.user._id) !== String(movie.owner)) {
        return next(new ForbiddenError('Не достаточно прав для совершения действия'));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((movieItem) => res.status(200).send({ data: movieItem, message: 'Фильм удален из сохраненных' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id фильма'));
      } else {
        next(err);
      }
    });
};
