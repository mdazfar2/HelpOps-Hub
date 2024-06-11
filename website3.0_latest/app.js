import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import engine from "ejs-mate";
configDotenv();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
// app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
  res.render("layout/boilerplate");
});

app.get("/team", (req, res) => {
  res.render("pages/team");
});
app.get("/about", (req, res) => {
  res.render("pages/about");
});
app.get("/resources", (req, res) => {
  res.render("pages/resource");
});
app.get("/contactus", (req, res) => {
  res.render("pages/contactUs");
});
app.get("*", (req, res) => {
  // res.render("pages/404");
  res.send("404 page not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
