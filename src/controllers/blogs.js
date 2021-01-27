const mongoose = require("mongoose");
const {Blog,UserIp} = require('../models/blog')


exports.add_blog = (req,res)=>{
    const thumbnail = req.body.thumbnail;
    const banner = req.body.banner;
    const heading = req.body.title;
    const subheading = req.body.subtitle;
    const content = req.body.content;
    const author = req.body.author;
    const instalink = req.body.link;
    const date = req.body.date;


    const newblog = new Blog({
        thumbnail,
        banner,
        heading,
        subheading,
        content,
        author,
        instalink,
        date,
    });

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

