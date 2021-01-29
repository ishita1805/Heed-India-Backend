const mongoose = require("mongoose");



const userip = new mongoose.Schema({
    userIp:{
        type:String,
        required:true,
    },
})


const blog = new mongoose.Schema({
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
    like:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'UserIP',
         default: "no data"
        }]

});
const Blog =  mongoose.model("Blog",blog);
const UserIp = mongoose.model('UserIP', userip);

module.exports.Blog =Blog;
module.exports.UserIp = UserIp ;