const secretKey = 'dev-secret';

const incorrectUrl = 'Не правильно указана ссылка';
const needAuthorization = 'Необходима авторизация';
const requiredField = 'Обязательное поле';
const pageNotFound = 'Страница не  найдена';
const notFoundData = 'Не переданы имя, email и/или пароль';
const mongoDuplicateKey = 'Такой пользователь уже существует';
const incorrectEmailOrPass = 'Не правильные почта или пароль';
const userNotFound = 'Пользователь не найден';
const incorrectData = 'Переданы некорректные данные';
const movieNotFound = 'Фильм не найден';
const noRightsToDelete = 'Не достаточно прав для совершения действия';
const movieDeleteFromSaved = 'Фильм удален из сохраненных';
const incorrectMovieId = 'Невалидный id фильма';
const incorrectEmail = 'Не правильно указан email';
const minUserName = 'Имя пользователя должно содержать не менее 2-х символов';
const maxUserName = 'Имя пользователя должно содержать не более 30-ти символов';

const mongoDuplicateKeyErrorCode = 11000;

module.exports = {
  secretKey,
  incorrectUrl,
  needAuthorization,
  requiredField,
  pageNotFound,
  notFoundData,
  mongoDuplicateKey,
  incorrectEmailOrPass,
  userNotFound,
  incorrectData,
  movieNotFound,
  noRightsToDelete,
  movieDeleteFromSaved,
  incorrectMovieId,
  incorrectEmail,
  minUserName,
  maxUserName,
  mongoDuplicateKeyErrorCode,
};
