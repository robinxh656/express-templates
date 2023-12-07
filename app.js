const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const createError = require('./src/errors/createError');
const globalErrorHandler = require('./src/errors/globalErrorHandler');

// Create an Express application
const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse request bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Parse cookies
app.use(cookieParser());

// Configure Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Global router

// Global Error
app.all('*', (req, res, next) => {
  next(new createError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Export the Express application for use in your project
module.exports = app;
