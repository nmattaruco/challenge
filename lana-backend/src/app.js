/* eslint no-console: "error" */
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ValidationError } = require('express-json-validator-middleware');
const { router: CheckoutRouter } = require('./components/checkout');
require('./components/discount');
require('./components/product');

const app = express();

require('dotenv').config();

const environment = process.env;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/health', (req, res) => {
  res.send({ message: 'UP' });
});

app.use(CheckoutRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ValidationError) {
    // TODO ERROR HANDLING
    res.status(400).send({ err });
    next();
  } else {
    res.status(err.status || 500);
  }
});

mongoose.connect(environment.MONGO_CONN_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err, res) => {
  console.log('err', err);
});

module.exports = app;
