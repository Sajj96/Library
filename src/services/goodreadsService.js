/* eslint-disable no-undef */
const axios = require("axios");
const xml2js = require("xml2js");

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://www.goodreads.com/book/show/${id}.xml?key=cIkKGrfBNLJFIDX0rQy3fQ`
        )
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) throw err;
            resolve(result.GoodreadsResponse.book);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
