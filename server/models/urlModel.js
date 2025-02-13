const AppError = require("../AppError");
const client = require("../src/db");

const saveShortUrl = (shortUrl, originalUrl) => {
  return client
    .query(
      "INSERT INTO urls (short_url, original_url) VALUES ($1, $2) RETURNING *",
      [shortUrl, originalUrl]
    )
    .then((result) => result.rows[0].short_url)
    .catch((error) => {
      if (error.code === "23505") {
        throw new AppError(
          409,
          "URL_ALREADY_EXIST",
          "Questo URL è già stato accorciato",
          "/shorten"
        );
      } else {
        console.error(error);
        throw new AppError(
          500,
          "DATABASE_ERROR",
          "Errore nel Database",
          "/shorten"
        );
      }
    });
};

module.exports = {
  saveShortUrl
};
