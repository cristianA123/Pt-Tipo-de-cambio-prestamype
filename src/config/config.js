require('dotenv').config();

const config = {
  mongodbCnn: process.env.MONGODB_CNN || 'mongodb://cristian:123456@localhost:27017',
  secretorprivatekey: process.env.SECRETORPRIVATEKEY || 'SECRETORPRIVATEKEY',
  ratesUrl: process.env.RATES_URL || 'https://api.test.cambioseguro.com/api/v1.1/config/rates',
  port: process.env.PORT || 4000,
}

module.exports = { config };
