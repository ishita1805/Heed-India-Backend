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


exports.get_blog = (req,res)=>{
    Blog.find()
    .then((center) => res.json(center))
    .catch((err) => res.json(err));
}

exports.check_likes=(req,res)=>{
    UserIp.findByIdAndDelete(req.body.userIp)
    .then(() => res.json('Ip deleted.'))
    .catch(()=>{
        const userIp = req.body.userIp;

        const likes = new UserIp({
            userIp,
        });

        likes.save()
        .then(ip =>res.json('ip added: '+ip))
        .catch(()=>res.satus(400).json("error"))}
    );
}

