/* eslint-disable no-undef */
const { MongoClient, ObjectID } = require("mongodb");

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        const db = client.db(dbName);

        const col = db.collection("books");
        const books = await col.find().toArray();
        res.render("bookListView", {
          nav,
          title: "Library",
          books,
        });
      } catch (err) {
        console.log(err.stack);
      }
      client.close();
    })();

    //********Mysql  to select *//********* */
    // con.query("select * from books", (err, rows) => {
    //   if (err) throw err;
    //   res.render("bookListView", {
    //     nav,
    //     title: "Library",
    //     books: rows,
    //   });
    // });
  }
  function getById(req, res) {
    const id = req.params.id;
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        const db = client.db(dbName);

        const col = await db.collection("books");
        const book = await col.findOne({ _id: new ObjectID(id) });

        book.details = await bookService.getBookById(book.bookId)
        res.render("bookView", {
          nav,
          title: "Library",
          book,
        });
      } catch (err) {
        console.log(err.stack);
      }
      client.close();
    })();

    //********Mysql  to select one with middleware *//********* */
    // .all((req, res, next) => {
    //   const id = req.params.id;
    //   con.query("select * from books where id = ?", [id], (err, rows) => {
    //     if (err) throw err;
    //     req.book = rows[0];
    //     next();
    //   });
    // })
    // .get((req, res) => {
    //   res.render("bookView", {
    //     nav,
    //     title: "Library",
    //     book: req.book,
    //   });
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
