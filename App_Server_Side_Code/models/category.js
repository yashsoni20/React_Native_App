const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({    // this is model schema 
   name : {
    type:String,
    required:true
   },
  icon : { 
    type : String,
},
   color : { 
    type : String,
  
},
})

exports.Category = mongoose.model('Category',CategorySchema); //model 