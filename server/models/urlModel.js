const AppError = require("../AppError");
const client = require("../src/db");

const saveShortUrl = (shortUrl, originalUrl) => {
  return client
    .query(
      "INSERT INTO urls (short_url, original_url, used) VALUES ($1, $2, $3) RETURNING *",
      [shortUrl, originalUrl, 0]
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

const findShortUrl = (shortUrl) => {
  return client
    .query(
      "UPDATE urls SET used = used + 1 WHERE short_url = $1 RETURNING original_url",
      [shortUrl]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        throw new AppError(
          404,
          "URL_NOT_FOUND",
          "URL non trovato",
          `/${shortUrl}`
        );
      }
      return result.rows[0].original_url;
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof AppError && error.status === 404) throw error;
      throw new AppError(
        500,
        "DATABASE_ERROR",
        "Errore nel Database",
        `/${shortUrl}`
      );
    });
};

const findAll = () => {
  return client
    .query("SELECT * FROM urls")
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error);
      throw new AppError(500, "DATABASE_ERROR", "Errore nel Database", "/all");
    });
};

module.exports = {
  saveShortUrl,
  findShortUrl,
  findAll
};
