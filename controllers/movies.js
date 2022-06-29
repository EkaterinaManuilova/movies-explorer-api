const Movie = require('../models/movie');
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

const {
  incorrectData,
  movieNotFound,
  noRightsToDelete,
  movieDeleteFromSaved,
  incorrectMovieId,
} = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
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
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(incorrectData));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(movieNotFound));
      }
      if (String(req.user._id) !== String(movie.owner)) {
        return next(new ForbiddenError(noRightsToDelete));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((movieItem) => res.send({ data: movieItem, message: movieDeleteFromSaved }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(incorrectMovieId));
      } else {
        next(err);
      }
    });
};
