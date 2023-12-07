const createError = require('./createError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  // Wrong mongoDB id error
  if (err.name === 'CastError') {
    const msg = `Resource not found. Invalid: ${err.path}`;
    err = new createError(msg, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const msg = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new createError(msg, 400);
  }

  // Wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const msg = `Json web token is invalid, try again`;
    err = new createError(msg, 400);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const msg = `Json web token is expired, try again`;
    err = new createError(msg, 400);
  }

  if (process.env.NODE_ENV === 'production') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
