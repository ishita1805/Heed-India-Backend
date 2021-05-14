const mongoose = require("mongoose");
const Card = require('../models/card');
const Page = require('../models/page');
const fs = require('fs');
const path = require('path')
const pathToDir = path.join(__dirname, '../../tmp')
const cloudinary = require('cloudinary').v2;
const e = require("express");

cloudinary.config({ 
    cloud_name: 'dtmhqs3e0', 
    api_key: '323497653845991', 
    api_secret: 'WDDW2x_CkmXKZ3AyWOEPoA5cfHg' 
  });


exports.createCard = (req, res) => {
    let data = {
        title:req.body.title,
        description: req.body.description
    }
    data._id = mongoose.Types.ObjectId();
    let file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath)
    .then((result) => {
        data.media = result.url;
        data.pid = result.public_id;
        const newcard = new Card(data)
        newcard.save()
        .then((resp) => {
            Page.findByIdAndUpdate(req.body.id, { $push: { cards: data._id } })
                .then(() => {
                    fs.rmdir(pathToDir,{ recursive: true }, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted tmp folder');
                    });
                    res.status(200).json({resp})
                })
                .catch((e) => {
                    res.status(500).json({e})
                })
        })
        .catch((e) => {
            res.status(500).json({e})
        })
    })
    .catch((e) => {
        res.status(500).json({e})
    })
}

exports.updateCard = (req, res) => {
    let data = {
        title:req.body.title,
        description:req.body.description
    }
    if(req.files){
        let file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath)
        .then((result) => {
            cloudinary.uploader.destroy(req.body.pid)
            .then(() => {
                data.pid = result.public_id;
                data.media = result.url;
                Card.update({ _id: req.body._id}, data)
                .then((resp) => {
                    fs.rmdir(pathToDir,{ recursive: true }, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted tmp folder');
                    });
                    res.status(200).json({resp})
                })
                .catch((e) => {
                    console.log(e);
                    res.status(500).json({e})
                })
               
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({e})
            })

        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({e})
        })

    } else {
        Card.update({ _id: req.body._id}, data)
        .then((resp) => {
            res.status(200).json({resp})
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({e})
        })
    }
}

exports.deleteCard = (req, res) => {
    cloudinary.uploader.destroy(req.body.pid)
    .then(() => {
        Card.deleteOne({ _id: req.body._id })
        .then((resp) => {
            res.status(200).json({ resp })
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({e})
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({e})
    })
}
