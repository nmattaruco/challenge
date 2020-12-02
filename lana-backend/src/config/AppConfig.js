require('dotenv').config();

const environment = process.env;

const AppConfig = module.exports;

AppConfig.jwtSecret = environment.JWT_SECRET;