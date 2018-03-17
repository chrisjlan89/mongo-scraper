var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
 
  title: {
    type: String,
    unique: true
  },

  body : {
      type : String,
      unique: true
  },

  link : {
      type : String,
      unique : true
  },

  img : {
      type : String,
      unique: true
  },

  scrapeDate: {
    type: Date,
    default: Date.now
  },

  saved : {
     type: Boolean,
     default : false
  },

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]


 
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);


module.exports = {HeadlineSchema : HeadlineSchema , Headline : Headline}