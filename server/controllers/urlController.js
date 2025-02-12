const { getReqData } = require("../utils");
const { generateShortUrl } = require("../utils");
const { saveShortUrl } = require("../models/urlModel");
const { handleError } = require("../errorHandler");

const validateUrl = (urlString) => {
  try {
    if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
      urlString = "https://" + urlString;
    }
    console.log(urlString);
    new URL(urlString);
    return null;
  } catch (e) {
    return "URL non valido";
  }
};

//@descr Crea un nuovo "URL" accorciato
//@route POST /shorten
const createShortUrl = (req, res) => {
  getReqData(req)
    .then((body) => {
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        throw { status: 400, message: "Formato JSON non valido" };
      }
      const { original_url } = parsedBody;

      if (!original_url) throw { status: 400, message: "Manca l'URL" };

      const validationError = validateUrl(original_url);
      if (validationError) throw { status: 400, message: validationError };

      const shortUrl = generateShortUrl(original_url);
      return saveShortUrl(shortUrl, original_url);
    })
    .then((savedShortUrl) => {
      res.writeHead(201, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify({ short_url: savedShortUrl }));
    })
    .catch((error) => {
      console.error(error);
      const statusCode = error.status || 500;
      const message = error.message || "Errore interno del server";
      handleError(res, statusCode, message);
    });
};

module.exports = {
  createShortUrl
};
