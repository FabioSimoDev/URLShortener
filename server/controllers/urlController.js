const { getReqData } = require("../utils");
const { generateShortUrl } = require("../utils");
const { saveShortUrl } = require("../models/urlModel");
const { handleError } = require("../errorHandler");
const AppError = require("../AppError");

const validateUrl = (urlString) => {
  //TODO: aggiungere 'https://' prima di qualunque testo renderà questa funzione inutile, in quanto ogni stringa verrà considerata un url valido. modificare con un RegEx
  try {
    if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
      urlString = "https://" + urlString;
    }
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
        throw new AppError(
          400,
          "INVALID_JSON",
          "Formato JSON non valido",
          req.url
        );
      }
      const { original_url } = parsedBody;

      if (!original_url)
        throw new AppError(400, "INVALID_PAYLOAD", "Manca l'URL", req.url);

      const validationError = validateUrl(original_url);
      if (validationError)
        throw new AppError(400, "INVALID_URL", validationError, req.url);

      const shortUrl = generateShortUrl(original_url);
      return saveShortUrl(shortUrl, original_url);
    })
    .then((savedShortUrl) => {
      res.writeHead(201, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify({ short_url: savedShortUrl }));
    })
    .catch((error) => {
      console.error(error);
      handleError(res, error);
    });
};

module.exports = {
  createShortUrl
};
