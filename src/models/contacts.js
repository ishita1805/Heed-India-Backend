const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"no data",
    },
    email:{
        
        type:String,
        required:true,
        default:"no data",
    },
    number:{
        type:String,
        required:true,
        min:10,
        max:13,
        default:"no data",
    },
    message:{
        type:String,
        required:true,
        default:"no data",
    },

});

module.exports = mongoose.model("ContactUs",contactSchema);