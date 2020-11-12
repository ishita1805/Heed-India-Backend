const mongoose = require("mongoose");

const center = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    initiatives:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model("Center",center);