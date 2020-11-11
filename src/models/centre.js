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
    inititives:{
        type:String,
        required:true,
    },

});

module.export = mongoose.model("Center",center);