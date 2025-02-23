const https = require("https");
const fs = require("fs");
const {
  createShortUrl,
  getShortUrl,
  getAll,
  getMostUsedUrls
} = require("../controllers/urlController");
const { handleError } = require("../errorHandler");
const AppError = require("../AppError");

const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.cert")
};

const server = https.createServer(options, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log(req.url);
  if (req.method === "POST" && req.url === "/shorten") {
    createShortUrl(req, res);
  } else if (req.method === "GET" && req.url === "/all") {
    getAll(req, res);
  } else if (req.method === "GET" && req.url === "/top") {
    getMostUsedUrls(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/")) {
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
