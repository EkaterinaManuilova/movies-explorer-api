const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
});

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

app.use(limiter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('Server started');
});
