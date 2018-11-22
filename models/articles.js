let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  auther:{
    type: String,
    required: true
  },
  body:{
    type:String,
    required:true
  },
});

let Articel = module.exports = mongoose.model('Article', articleSchema);
