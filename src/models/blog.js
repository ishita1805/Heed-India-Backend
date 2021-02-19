const mongoose = require("mongoose");

const blog = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thumbnail:{
        type:String,
        required:true,
        default:"no data",
    },
    banner:{
        
        type:String,
        required:true,
        default:"no data",
    },
    heading:{
        type:String,
        required:true,
        default:"no data",
    },
    subheading:{
        type:String,
        required:true,
        default:"no data",
    },
    content:{
        type:String,
        required:true,
        default:"no data",
    },
    author:{
        type:String,
        required:true,
        default:"no data",
    },
    date:{
        type:Date,
        required:true,
        default:"no data",
    },
    instalink:{
        type:String,
        required:true,
        default:"no data",
    },
    likes:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'UserIP',
        }
    ]
});

module.exports = mongoose.model("Blog",blog);