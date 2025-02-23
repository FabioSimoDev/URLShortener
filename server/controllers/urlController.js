const { getReqData } = require("../utils");
const { generateShortUrl } = require("../utils");
const {
  saveShortUrl,
  findShortUrl,
  findAll,
  findMostUsedUrls
} = require("../models/urlModel");
const { handleError } = require("../errorHandler");
const AppError = require("../AppError");
const validator = require("validator");

const validateUrl = (urlString) => {
  //TODO: aggiungere 'https://' prima di qualunque testo renderà questa funzione inutile, in quanto ogni stringa verrà considerata un url valido. modificare con un RegEx
  //update: ho usato una libreria per non reinventare la ruota, ma sarebbe stato meglio usare un RegEx
  const options = {
    require_protocol: true,
    require_valid_protocol: true,
    require_tld: true,
    protocols: ["http", "https"]
  };
  if (validator.isURL(urlString, options)) {
    return null;
  } else {
    return "URL non valido";
  }
};

//@descr Ottiene gli URL più usati
//@route GET /top
const getMostUsedUrls = (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const queryParams = url.searchParams;
  const limit = queryParams.get("limit") || 10;

  findMostUsedUrls(limit)
    .then((mostUsedUrls) => {
      res.writeHead(200, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify(mostUsedUrls));
    })
    .catch((error) => {
      console.error(error);
      handleError(res, error);
    });
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
      let { original_url } = parsedBody;

      if (
        !original_url.startsWith("http://") &&
        !original_url.startsWith("https://")
      )
        original_url = "https://" + original_url;

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

//@descr ottiene un URL corto dal database
//@route GET '/:url'
const getShortUrl = (req, res) => {
  const url = req.url.substring(1);
  try {
    if (!url.length)
      throw new AppError(400, "INVALID_PARAMETER", "Manca l'URL", req.url);
  } catch (error) {
    handleError(res, error);
  }

  findShortUrl(url)
    .then((original_url) => {
      if (!original_url)
        throw new AppError(
          404,
          "NOT_FOUND",
          "A questo URL corto non è associato nessun URL",
          req.url
        );
      res.writeHead(301, { Location: original_url });
      res.end();
    })
    .catch((error) => {
      console.error(error);
      handleError(res, error);
    });
};

//@descr ottiene tutti gli URL accorciati
//@route GET /all
const getAll = (req, res) => {
  findAll()
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      console.error(error);
      handleError(res, error);
    });
};

module.exports = {
  createShortUrl,
  getShortUrl,
  getAll,
  getMostUsedUrls
};
