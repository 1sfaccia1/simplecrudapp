let mongoose = require('mongoose');

let linkupSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type:String,
    required:true
  }
});

let Linkup = module.exports = mongoose.model('Linkup', linkupSchema);
