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
        throw { status: 409, message: "Questo URL è già stato accorciato" };
      } else {
        console.error(error);
        throw { status: 500, message: "Errore nel DataBase" };
      }
    });
};

module.exports = {
  saveShortUrl
};
