const https = require("https");
const fs = require("fs");
const { URL } = require("url");
const { generateShortUrl } = require("../utils");
const { createShortUrl, getShortUrl } = require("../controllers/urlController");
const { handleError } = require("../errorHandler");
const AppError = require("../AppError");

const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.cert")
};

const server = https.createServer(options, async (req, res) => {
  //   console.log(req);
  //   const parsedUrl = new URL(`https://` + req.headers.host + req.url);
  //   console.log(parsedUrl);
  console.log(req.url);
  if (req.method === "POST" && req.url === "/shorten") {
    createShortUrl(req, res);
  }
  if (req.method === "GET" && req.url.startsWith("/")) {
    getShortUrl(req, res);
  } else {
    handleError(
      res,
      new AppError(404, "ENDPOINT_NOT_FOUND", "Endpoint non trovato", req.url)
    );
  }
});

server.listen(3000, () => {
  console.log("Server HTTPS avviato su https://localhost:3000");
});
