const handleError = (res, statusCode, message) => {
  if (!res.headersSent) {
    res.writeHead(statusCode, { "Content-Type": "application/JSON" });
    res.end(JSON.stringify({ error: message }));
  }
};

module.exports = {
  handleError
};
