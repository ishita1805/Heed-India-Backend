const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  
    email:{
        
        type:String,
        required:true,
        default:"no data",
    },

});

module.exports = mongoose.model("NewsLetter",letterSchema);