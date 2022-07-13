const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const { corsOptions, MONGO_URL, PORT } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');

const router = require('./routes/index');

const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use(requestLogger);

app.use(limiter);

app.use(cors(corsOptions));

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(cors());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started');
});
