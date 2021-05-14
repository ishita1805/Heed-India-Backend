const mongoose = require("mongoose");
const Page = require('../models/page');
const fs = require('fs');
const path = require('path')
const pathToDir = path.join(__dirname, '../../tmp')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dtmhqs3e0', 
    api_key: '323497653845991', 
    api_secret: 'WDDW2x_CkmXKZ3AyWOEPoA5cfHg' 
  });

exports.createPage = (req, res) => {
    let data = req.body;
    data._id = mongoose.Types.ObjectId();
    const page = new Page(data);
    page.save()
    .then((resp) => {
        res.status(200).json({resp})
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({e})
    })
}

exports.getPage = (req, res) => {
    Page.findById(req.body.id)
    .populate("stats")
    .populate("cards")
    .then((resp) => {
        res.status(200).json({resp});
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({e});
    })
}

exports.updatePage = (req, res) => {
    let data = req.body;
    if(req.files){
        let file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath)
        .then((result) => {
            cloudinary.uploader.destroy(req.body.pid)
            .then(() => {
                data.pid = result.public_id;
                data.media = result.url;
                fs.rmdir(pathToDir,{ recursive: true }, (err) => {
                    if (err) throw err;
                    console.log('successfully deleted tmp folder');
                });
                Page.update({ _id: req.body.id }, data)
                .then((resp) => {
                    res.status(200).json({ resp });
                })
                .catch((e) => {
                    console.log(e);
                    res.status(500).json({e})
                })
            })

        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({e})
        })
    }
    else {
        Page.update({ _id: req.body.id }, data)
        .then((resp) => {
            res.status(200).json({ resp });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({e})
        })
    }  
}
