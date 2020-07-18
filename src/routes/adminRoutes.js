/* eslint-disable no-undef */
const express = require("express");
const { MongoClient } = require("mongodb");

const adminRouter = express.Router();
const books = [
  {
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Lev Nikolayevich Tolstoy",
    bookId: 656,
    read: false,
  },
  {
    title: "Les Miserable",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    bookId: 24280,
    read: false,
  },
  {
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    read: false,
  },
  {
    title: "A Journey into the Center of the Earth",
    genre: "Science Fiction",
    author: "Julius Verne",
    read: false,
  },
  {
    title: "The Dark Word",
    genre: "Fantasy",
    author: "Henry Kuttner",
    read: false,
  },
  {
    title: "The Wind",
    genre: "Fantasy",
    author: "Henry Kuttner",
    read: false,
  },
];

function router(nav) {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log("Connected to MongoDB");
          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books)
          res.json(response)
        } catch (error) {
            console.log(error.stack)
        }
        client.close()
      }());
  });
  return adminRouter;
}

module.exports = router;
