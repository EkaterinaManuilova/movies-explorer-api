const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');

const { createUser, loginUser } = require('./controllers/users');
const { createUserValidation, loginUserValidation } = require('./middlewares/validations');
const { corsOptions, MONGO_URL, PORT } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');

const router = require('./routes');

const app = express();

app.use(cors(corsOptions));

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(cors());

app.use(requestLogger);

app.use(limiter);

app.post('/signup', createUserValidation, createUser);

app.post('/signin', loginUserValidation, loginUser);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started');
});
