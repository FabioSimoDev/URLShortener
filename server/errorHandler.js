const AppError = require("./AppError");

const handleError = (res, error) => {
  if (!res.headersSent) {
    const status = error instanceof AppError ? error.status : 500;
    const errorCode =
      error instanceof AppError ? error.errorCode : "INTERNAL_SERVER_ERROR";
    const message =
      error instanceof AppError ? error.message : "Errore interno del server";
    const timestamp =
      error instanceof AppError ? error.timestamp : new Date().toISOString();
    const path = error instanceof AppError ? error.path : "Unknown";

    res.writeHead(status, { "Content-Type": "application/JSON" });
    res.end(JSON.stringify({ status, errorCode, message, timestamp, path }));
  }
};

module.exports = {
  handleError
};
