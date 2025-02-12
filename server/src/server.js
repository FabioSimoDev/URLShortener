const https = require("https");
const fs = require("fs");
const { URL } = require("url");
const client = require("./db");
const crypto = require("crypto");

const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.cert")
};

//Funzione per generare un URL corto dato un URL lungo.
const generateShortUrl = (originalURL) => {
  return crypto
    .createHash("sha256")
    .update(originalURL)
    .digest("hex")
    .slice(0, 6);
};

const server = https.createServer(options, async (req, res) => {
  //   console.log(req);
  //   const parsedUrl = new URL(`https://` + req.headers.host + req.url);
  //   console.log(parsedUrl);
  res.writeHead(200, { "Content-Type": "application/JSON" });
  const shortUrl = generateShortUrl(req.url.slice(1, req.url.length));
  res.end(shortUrl);
  console.log(`${req.url.slice(1, req.url.length)} | ${shortUrl}`);
});

generateShortUrl("www.google.com");

server.listen(3000, () => {
  console.log("Server HTTPS avviato su https://localhost:3000");
});
