/* eslint-disable no-undef */
const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "library",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log(chalk.green("Database is connected"));
// });

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "library" }));

require('./src/config/passport.js')(app)

app.use(express.static(path.join(__dirname, "/public/"))); //Use static files in public folder
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Books" },
  { link: "/authors", title: "Authors" },
];

const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.get("/", function (req, res) {
  //    res.send('Hello from my library app');
  // res.sendFile(path.join(__dirname,'/views/index.html'));
  res.render("index", {
    nav: [
      { link: "/books", title: "Books" },
      { link: "/authors", title: "Authors" },
    ],
    title: "Library",
  });
});

app.listen(port, function () {
  debug(`listening on port  ${chalk.green(port)}`);
  // $env:DEBUG='app';node app.js
});
