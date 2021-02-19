const mongoose = require("mongoose");
const Blog = require('../models/blog');
const UserIp = require('../models/like');
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dtmhqs3e0', 
    api_key: '323497653845991', 
    api_secret: 'WDDW2x_CkmXKZ3AyWOEPoA5cfHg' 
  });

  
exports.add_blog = (req,res)=>{
    let data = req.body
    const file1 = req.files.thumbnail;
    const file2 = req.files.banner;
    let link1 ;
    let link2 ;
    
    cloudinary.uploader.upload(file1.tempFilePath, function(error, result) {
        link1 = result.url;       
   
        cloudinary.uploader.upload(file2.tempFilePath, function(error, result) {
            link2 = result.url;

            data.thumbnail = link1
            data._id = mongoose.Types.ObjectId();
            data.banner = link2
            console.log(data); // reaching here
            const newblog = new Blog(data);
            newblog.save()
            .then(blog=> {
                res.json(blog);
                console.log(blog);
            })
            .catch((error)=>{ 
                console.log(error);
                res.status(400).json(error)}
                );
        });
    });
    
}

//GET ALL BLOG
exports.get_blog = (req,res)=>{
    Blog.find()
    .populate('likes')
    .exec()
    .then((blog) => res.status(200).json(blog))
    .catch((err) => res.status(400).json(err));
}

//GET BLOG BY ID
exports.get_blogid = (req,res)=>{
    Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.json(err));
}

// Likes on the blog
exports.set_like_status = (req,res)=>{
    UserIp.findOne({userIp:req.ip.toString()})
    .then((resp)=>{
        console.log(resp);
        if(resp) {
            Blog.findByIdAndUpdate(req.body.blogId,{ $pull: { likes : resp._id } })
            .then(()=>{
                UserIp.findByIdAndDelete(resp._id)
                .then(()=>res.status(200).json({message:"deleted like"}))
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json(err)
                })
            })
            .catch((e)=>{
                console.log(e);
                res.status(400).json(e)
            })
           
        }
        else {
            const id = mongoose.Types.ObjectId();
            const IP = new UserIp({
                _id: id,
                userIp:req.ip.toString(),
            });
            IP.save()
                .then(()=>{
                    Blog.findByIdAndUpdate(req.body.blogId, { $push: { likes: id } })
                        .then(()=>res.status(200).json({message:'created like'}))
                        .catch((err)=>res.status(400).json(err));
                })
                .catch((err)=>res.status(400).json(err));
        }
    })
    .catch((err)=>res.status(400).json(err))
}

