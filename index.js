import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path'

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create-post", (req, res) => {
  res.render("create-post");
});

app.post("/create-post", (req, res) => {
  console.log(req)
  const { title, content } = req.body;

  // Define the file path where the new EJS file will be saved
  const filePath = path.join(__dirname, "views", "posts", `${title}.ejs`);

  // Create the content for the EJS file
  const postContent = `
    <h1><%= title %></h1>
    <p><%= content %></p>
    <a href="/posts">Back to Posts</a>
  `;

  fs.writeFile(filePath, postContent, (er) => {
    if (er) {
      console.error('Error creating file:', er);
      return res.status(500).send('Error saving post');
    }

    // Redirect to the newly created post
    res.render('single-post', {title: title, content: content});
  });
});

app.get("/view-post", (req, res) => {
  res.render("single-post");
});

app.get("/edit-post", (req, res) => {
  res.render("index");
});

app.listen(port, er => {
  if (er) throw er;
  console.log(`Server running on port ${port}.`);
});
