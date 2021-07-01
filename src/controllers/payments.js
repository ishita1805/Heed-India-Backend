const Razorpay = require('razorpay')
const shortid = require('shortid')
const mongoose = require("mongoose");
const Payment = require('../models/payment')
const email = require('./email')
const crypto = require('crypto');


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_DEV,
    key_secret: process.env.REAZORPAY_SECRET_DEV,
});


exports.make_payment = (req, res, next) => {
       const options= {
        amount : req.body.data.amt,
        currency : 'INR',
        receipt : shortid.generate(),
        payment_capture: 1,
       }
        instance.orders.create(options)
        .then((resp)=>{
            const pay = new Payment({
                _id:mongoose.Types.ObjectId(),
                offerId:resp.id,
                amount: resp.amount/100,
                currency: resp.currency,
                pan:req.body.data.pan,
                address: req.body.data.address,
                state: req.body.data.state,
                city: req.body.data.city,
                pincode:req.body.data.pincode,
                remarks: req.body.data.remarks,
                name: req.body.data.name,
                contact: 0,
                receipt: 301,
                email: '-',
                status: resp.status,
                createdAt: new Date().toDateString()
            })
            pay.save()
            .then((response)=>{
                res.json({ 
                    response,
                    key:  process.env.RAZORPAY_KEY_DEV
                 });
            })
            .catch((e)=>{
                console.log(e)
             res.json({
                 error:"mongoDB error"
                });
            })
        })
        .catch(()=>{
            res.json({
                error:"razorpay error"
            });
        })
}


exports.verification = (req, res) => {
    // console.log('verification')
    const SECRET = process.env.VERIFICATION_SECRET
    const shasum = crypto.createHmac('sha256', SECRET)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    if(digest === req.headers['x-razorpay-signature']) {
        Payment.find({status:'captured'}).sort({'_id':-1}).limit(1)
        .then((resp)=>{
            console.log(resp)
            var receipt = 301;
            if(resp.length >= 1)
            {
                receipt = parseInt(resp[0].receipt) +1
            }
            else{
                receipt = 301;
            }
            let updateObj = {
                status: req.body.payload.payment.entity.status,
                email: req.body.payload.payment.entity.email,
                contact:  req.body.payload.payment.entity.contact,
                receipt,
                bank:req.body.payload.payment.entity.bank,
                wallet:req.body.payload.payment.entity.wallet,
            }
            req.body.payload.payment.entity.card_id?updateObj['card']=req.body.payload.payment.entity.card:null
            console.log(updateObj)
            Payment.updateOne({ offerId: req.body.payload.payment.entity.order_id }, updateObj)
            .then(() => {
                email(req.body.payload.payment.entity.email,req.body.payload.payment.entity.amount,receipt);
                return res.status(200).json({
                    'status':'ok'
                })  
            })
            .catch((e) => {
                console.log(e);
                res.status(200).json({
                    error:"mongodb error update"
                });
            })
        })
        .catch((e) => {
            console.log(e);
            res.status(200).json({
                error:"mongodb error find"
            });
        })
    } else {
        res.status(200).json({'status':'not ok'})  
    }
}

exports.payments = (req, res) => {
   Payment.find({ status:'captured' })
   .then((resp) => {
       res.status(200).json(resp)
   })
   .catch((e) => {
    res.status(200).json({
        message:'mongodb error'
    })
   })
}

exports.payment = (req, res) => {
    // console.log(req.query)
   Payment.findOne({ receipt: req.query.receipt })
   .then((resp) => {
    //    console.log(resp)
       res.status(200).json(resp)
   })
   .catch((e) => {
    res.status(200).json({
        message:'mongodb error'
    })
   })
}