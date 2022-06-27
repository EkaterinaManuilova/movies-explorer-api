require('dotenv').config();

module.exports.corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports.MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';
const { PORT = 3001 } = process.env;
module.exports = PORT;
