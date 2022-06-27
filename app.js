require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');

const { createUser, loginUser } = require('./controllers/users');
const { createUserValidation, loginUserValidation } = require('./middlewares/validations');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');

const router = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

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
