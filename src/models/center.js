const mongoose = require("mongoose");

const center = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"no data",
    },
    about:{
        
        type:String,
        required:true,
        default:"no data",
    },
    work:{
        type:String,
        required:true,
        default:"no data",
    },
    initiatives:{
        type:String,
        required:true,
        default:"no data",
    },

});

module.exports = mongoose.model("Center",center);