var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
// var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");
var async = require("async")
var PORT = process.env.PORT || 3000 ;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.

require("./routes/api.js")(app, request, cheerio, async, mongoose, bodyParser);
require("./routes/view.js")(app, path)

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrape";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});







