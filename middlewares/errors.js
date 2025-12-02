const { ERRORS } = require("../utils/constants");

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const mapMongooseError = (err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return new AppError(400, ERRORS.BAD_REQUEST);
  }
  if (err.code === 11000) {
    return new AppError(409, ERRORS.CONFLICT);
  }
  return null;
};

const errorHandler = (err, req, res, next) => {
  const mapped = mapMongooseError(err);

  const status = err.statusCode || mapped?.statusCode || 500;
  const message = mapped?.message || err.message || ERRORS.SERVER;

  res.status(status).send({ message });
};

module.exports = {
  errorHandler,
  AppError,
};
