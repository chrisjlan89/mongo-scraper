var db = require("../models")

module.exports = function(app, path) {

app.get("/", function(req, res){
    db.Headline.Headline.find({})
      .then(function (dbHeadlines) {
        // checkCategory(dbThread)
        res.render('home', {headlines: dbHeadlines})
      })

    });


    app.get("/saved", function(req, res){
        db.Headline.Headline.find({})
          .populate("notes")
          .then(function (dbHeadlines) {
            // checkCategory(dbThread)
            res.render('saved', {headlines: dbHeadlines})
          })
    
        });


    }