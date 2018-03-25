var db = require("../models");



module.exports = function(app, request, cheerio, async, mongoose, bodyParser) {

  
    app.get("/scrape", function(req, res){
        request("http://www.espn.com/nfl/", function(error, response, html) {
    
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);
          
            // An empty array to save the data that we'll scrape
            
            // Select each element in the HTML body from which you want information.
            // NOTE: Cheerio selectors function similarly to jQuery's selectors,
            // but be sure to visit the package's npm page to see how it works
            var headerArr = [];
            $("a.contentItem__padding").each(function(i, element) {
          
              var link = $(element).attr("href")
              var title = $(element).find("h1").attr("class" , "contentItem_title").text()
           
              
              
              var body =  $(element).find("p").attr("class" , "contentItem__subhead").text()
              
    
             var img =  $(element).find("img").attr("data-default-src");
    
           //   console.log( "text" , text, )
                console.log("Link :", link)
                console.log("\n \n")
                console.log("Title :", title)
                console.log("\n \n")
                console.log("Text :", body)
                console.log("\n \n") 
    
                console.log(img)
    
                
    
               
    
                var header = {
                     title : title,
                     body : body,
                     link : "https://www.espn.com" + link,
                     img : img
                }
                
                  
                if(header.title !=null && header.body !=null  && header.img !=null && headerArr.indexOf(header) == -1){

                headerArr.push(header)
    
                console.log('header arr' , headerArr)
                }

                else {
                    return
                }
    
            
            // please help me understand this line. Andrew helped me with this part    
                
                async.each(headerArr, function(data){
                    db.Headline.Headline.create(headerArr , function(error , data){
                        console.log(headerArr)
                      
                    })
                    //res.render(data)
                }) 
                
          
            });
          
            });
    })


    app.post("/save", function(req,res) {
        console.log('inside save')
       db.Headline.Headline
       .find({_id: req.body._id})
       .then(function(dbHeadline){
           console.log('dbHeadline' , dbHeadline)
           if(dbHeadline[0].saved == false){
        dbHeadline[0].set({ saved: true });
           }
        //    else{
        //     dbHeadline[0].set({ saved: false }); 
        //    }
        //  dbHeadline.update({ _id: req.body.id }, { $set: { saved: false }})
        dbHeadline[0].save(function (err, updatedHeadline) {
          if (err) return handleError(err);
         
          res.location('/')
        });
       })
    })
    


    app.post("/unsave", function(req,res) {
        console.log('inside unsave')
       db.Headline.Headline
       .find({_id: req.body._id})
       .then(function(dbHeadline){
           console.log('dbHeadline' , dbHeadline)
           if(dbHeadline[0].saved == true){
        dbHeadline[0].set({ saved: false });
           }
        //    else{
        //     dbHeadline[0].set({ saved: false }); 
        //    }
        //  dbHeadline.update({ _id: req.body.id }, { $set: { saved: false }})
        dbHeadline[0].save(function (err, updatedHeadline) {
          if (err) return handleError(err);
          
          res.redirect('/saved');
        });
       })
    })

    app.post('/deletenote', function(req,res){
        console.log('inside del note')
        console.log(req.body)
        db.Note.Note.findByIdAndRemove(req.params._id, (err, todo) => {  
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Todo successfully deleted",
                id: db.Note.Note._id
            };
            return res.status(200).send(response);
        });
        
        
    });

  


app.get("/scrappedArticles", function(req, res) {
    // Using our Headline model, "find" every Headline in our db
    db.Headline.Headline
      .find({})
      .then(function(dbHeadlines) {
        // If any Books are found, send them to the client
        res.json(dbHeadlines);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });


  app.post("/populated", function(req, res) {
      
    console.log('populate req.body' , req.body)
    db.Headline.Headline
    
      .find({_id : req.body._id})
      .populate("notes")
      .then(function(dbHeadWithNotes) {
        
        res.json(dbHeadWithNotes);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  


  app.post("/addNote", function(req, res) {
    console.log('req dat bodddyy first', req.body)
    var note = {
        body : req.body.note
    }
    // Create a new Note in the database
    db.Note.Note.create(note)
      .then(function(dbNote) {
          console.log(dbNote)
          console.log('req dat bodddyy second', req.body)
          console.log('dbNote', dbNote)
        // If a .Note was created successfully, find one headlines (there's only one) and push the new Note's _id to the headlines's `Notes` array
        // { new: true } tells the query that we want it to return the updated headline -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        console.log("WWWWWWWW" + req.body.note);
        return db.Headline.Headline.findOneAndUpdate({_id : req.body._id }, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then(function(dbHeadline) {
          console.log('inside sec promise')
        // If the Headline.Headline was updated successfully, send it back to the client
        res.json(dbHeadline);
        console.log(dbHeadline)
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

}



