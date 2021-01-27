const mongoose = require("mongoose");
const {Blog,UserIp} = require('../models/blog')


exports.add_blog = (req,res)=>{
    // data object with text data
    let data = req.body
    console.log(data);
    // upload files to cloudinary
    const file1 = req.files.thumbnail;
    const file2 = req.files.banner;

    // to do in then call
    
    //1. update urls in data object
    data.thumbnail = 'cloudinary link 1';
    data.banner ='cloudinary link 2';
    //2. save data object to new Blog instance
    const newblog = new Blog(data);
    res.status(200).json('success');
    newblog.save()
    .then(blog=> res.json(blog))
    .catch(()=> res.status(400).json("error"));
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

