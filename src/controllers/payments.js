const { json } = require('express')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const mongoose = require("mongoose");
const Payment = require('../models/payment')

const instance = new Razorpay({
    key_id: 'rzp_test_PsxGKItWtb7jwL',
    key_secret: 'uvzcqRHvKhxjFVPQ0hgZupvX',
});


exports.add_payment = async (req, res, next) => {
    try{
        console.log(req.body.amount)
       const options= {
        payment_capture: 1,
        amount : req.body.amount,
        currency : 'INR',
        receipt : shortid.generate()
       }
        instance.orders.create(options)
        .then((resp)=>{
            
            const pay = new Payment({
                _id:mongoose.Types.ObjectId(),
                offerId:resp.id,
                amount: resp.amount/100,
                currency: resp.currency,
                receipt: resp.receipt,
                status: resp.status,
                createdAt: resp.created_at
            })

            pay.save()
            .then((response)=>{
                res.json({
                    message:'request successful',
                    data: resp
                });
            })
            .catch(()=>{
             res.json({
                 error:"mongoDB error"
                });
            })

        })
        
    }
    catch(e){
        res.json({message:'something went wrong'});
    }
   
}
