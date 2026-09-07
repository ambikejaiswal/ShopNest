const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const createOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        //Razorpay accept only INR currency
        const options = {
            amount: req.body.amount * 100,
            currency: 'INR',
        };

        const order = await instance.orders.create(options);
        if(!order) return res.status(500).send('some error occured');
        res.status(200).json({ order });
    } catch (error) {
    console.error("RAZORPAY CREATE ORDER ERROR:", error);
    res.status(500).json({ 
        message: error.message 
    });
    }
};

const verfiyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto

            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (generated_signature === razorpay_signature) {
            res.status(200).json({ message: 'Payment verified successfully' });
        }
        else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment' });   
    }
};

module.exports = { createOrder, verfiyPayment };
