import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create-post", (req, res) => {
  res.render("/create-post");
});

app.post("/create-post", (req, res) => {
  res.render("viewSinglePost");
});

app.get("/view-post", (req, res) => {
  res.render("viewSinglePost");
});

app.get("/edit-post", (req, res) => {
  res.render("index");
});

app.listen(port, er => {
  if (er) throw er;
  console.log(`Server running on port ${port}.`);
});
