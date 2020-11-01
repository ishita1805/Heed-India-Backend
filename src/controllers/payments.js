const { json } = require('express')
const Razorpay = require('razorpay')
const shortid = require('shortid')


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
       const resp = await instance.orders.create(options);
       console.log(resp)
        res.json({
            message:'request successful',
            id:resp.id,
            currency:resp.currency,
            amount: resp.amount
        });
    }
    catch(e){
        res.json({message:'something went wrong'});
    }
   
}
