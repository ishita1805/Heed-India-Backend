const mongoose = require("mongoose");
const Page = require('../models/page');
const Donor = require('../models/donors')
const fs = require('fs');
const path = require('path')
const pathToDir = path.join(__dirname, '../../tmp')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dtmhqs3e0', 
    api_key: '323497653845991', 
    api_secret: 'WDDW2x_CkmXKZ3AyWOEPoA5cfHg' 
  });

exports.createDonor = (req, res) => {
    let data = {
        _id = mongoose.Types.ObjectId(),
    }
    let file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath)
    .then((result) => {
        data.url = result.url;
        data.pid = result.public_id;
        const newdonor = new Donor(data);
        newdonor.save()
        .then((resp) => {
            Page.findByIdAndUpdate(req.body.id, { $push: { donors: data._id } })
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

exports.updateDonor = (req, res) => {
    let data = {
        _id = mongoose.Types.ObjectId(),
    }
    let file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath)
    .then((result) => {
        cloudinary.uploader.destroy(req.body.pid)
        .then(() => {
            data.pid = result.public_id;
            data.url = result.url;
            Donor.update({ _id: req.body._id}, data)
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
}

exports.deleteDonor = (req, res) => {
    cloudinary.uploader.destroy(req.body.pid)
    .then(() => {
        Donor.deleteOne({ _id: req.body._id })
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