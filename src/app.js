const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");
const app = express();

//setup static directory to server
const publicDirectory = path.join(__dirname, "./../public");
app.use(express.static(publicDirectory));

//express config for hbs
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "./../templates/views");
app.set("views", viewsPath);

//partials (reusable html)
const partialsPath = path.join(__dirname, "./../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Musaib",
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Musaib" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Musaib" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(req.query.address, (error, { lat, lon, display_name } = {}) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(lat, lon, (error, forecast) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({ location: display_name, forecast });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Musaib",
    errorMessage: "Article not found!!",
  });
});

app.get("*", (_, res) => {
  res.render("error", {
    title: "404",
    name: "Musaib",
    errorMessage: "Page not found",
  });
});

app.listen(3001, () => {
  console.log("Server up on port 3001");
});
