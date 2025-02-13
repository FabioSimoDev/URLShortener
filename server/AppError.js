//Oggetto errore personalizzato

class AppError extends Error {
  constructor(status, errorCode, message, path) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.path = path;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
