const https = require("https");
const fs = require("fs");
const { URL } = require("url");
const { generateShortUrl } = require("../utils");
const { createShortUrl } = require("../controllers/urlController");
const { handleError } = require("../errorHandler");

const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.cert")
};

const server = https.createServer(options, async (req, res) => {
  //   console.log(req);
  //   const parsedUrl = new URL(`https://` + req.headers.host + req.url);
  //   console.log(parsedUrl);
  if (req.method === "POST" && req.url === "/shorten") {
    createShortUrl(req, res);
  } else {
    handleError(res, 404, "Endpoint non trovato o metodo non valido.");
  }
});

server.listen(3000, () => {
  console.log("Server HTTPS avviato su https://localhost:3000");
});
