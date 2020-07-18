/* eslint-disable no-undef */
const express = require("express");
const passport = require("passport");
const { MongoClient } = require("mongodb");

const authRouter = express.Router();

function router(nav) {
  authRouter.route("/signUp").post((req, res) => {
    //create user
    const { username, password } = req.body;
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        const db = client.db(dbName);

        const col = await db.collection("users");
        const user = { username, password };
        const results = await col.insertOne(user);
        req.login(results.ops[0], () => {
          res.redirect("/auth/profile");
        });
      } catch (err) {
        console.log(err.stack);
      }
    })();
  });

  authRouter
    .route("/signin")
    .get((req, res) => {
      res.render("signin", {
        nav,
        title: "SignIn",
      });
    })
    .post(
      passport.authenticate("local", {
        successRedirect: "/auth/profile",
        failureRedirect: "/",
      })
    );

  authRouter
    .route("/profile")
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect("/");
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
