const crypto = require("crypto");

//Funzione per generare un URL corto dato un URL lungo.
const generateShortUrl = (originalURL) => {
  return crypto
    .createHash("sha256")
    .update(originalURL)
    .digest("hex")
    .slice(0, 6);
};

const getReqData = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });
  });
};

module.exports = {
  generateShortUrl,
  getReqData
};
