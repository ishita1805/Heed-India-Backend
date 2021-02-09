const mongoose = require("mongoose");
const {Blog,UserIp} = require('../models/blog')
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dtmhqs3e0', 
    api_key: '323497653845991', 
    api_secret: 'WDDW2x_CkmXKZ3AyWOEPoA5cfHg' 
  });

  
exports.add_blog = (req,res)=>{

    let data = req.body
    console.log(data);

    const file1 = req.files.thumbnail;
    const file2 = req.files.banner;
    let link1 ;
    let link2 ;
    
    cloudinary.uploader.upload(file1.tempFilePath, function(error, result) {
        link1 = result.url;       
   
        cloudinary.uploader.upload(file2.tempFilePath, function(error, result) {
            link2 = result.url;

            data.thumbnail = link1
            data.banner = link2
            console.log(data);
            const newblog = new Blog(data);
            newblog.save()
            .then(blog=> res.json(blog))
            .catch(()=> res.status(400).json("error"));
        });
    });
    
}

//GET ALL BLOG
exports.get_blog = (req,res)=>{
    Blog.find()
    .then((blog) => res.json(blog))
    .catch((err) => res.json(err));
}

//GET BLOG BY ID
exports.get_blogid = (req,res)=>{
    Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.json(err));
}

//SET LIKE/DISLIKE
exports.check_likes= async (req,res)=>{
    console.log(req.body.userIp)
    const user = await UserIp.findOne({userIp:req.body.userIp})
    
    if(user)
    {
        UserIp.findByIdAndDelete(user._id)
        .then(() => res.json('UserIp deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        const liked = req.body.userIp
        const IP = new UserIp({userIp:liked});
        IP.save()
        .then((ip)=>res.json(ip))
        .catch((err)=>res.status(400).json(err));
    }
}

//CHECK FOR INITIAL LIKE/DISLIKE
exports.get_likes= async (req,res)=>{
    console.log(req.body.userIp)
    const user = await UserIp.findOne({userIp:req.body.userIp})
    console.log(user)
    if(user)
    {
        res.json("true")
    }
    else
    {
        res.json("false")
    }
}

