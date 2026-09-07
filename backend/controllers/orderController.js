const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

//create order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
if (!items || items.length === 0 || !totalAmount || !address) {
    return res.status(400).json({
        message: 'Invalid order data'
    });
} 
        else{
            const order = new Order({
               user: req.user._id,
               products: items,
               totalAmount,
               address: {
                    fullName: address.fullName,
                    street: address.street,
                    city: address.city,
                    postalCode: address.postalCode,
                    country: address.country,
                },
                paymentId
            });
            await order.save();
            const message = `Dear ${req.user.name},\n\n Thank you for your order! 
            Your order has been successfully created with the following details:
            \n\nOrder ID: ${order._id}\nTotal Amount: ${order.totalAmount}
            \nAddress: ${order.address.fullName}, ${order.address.street},
            ${order.address.city}, ${order.address.postalCode}, ${order.address.country}
            \nPayment ID: ${order.paymentId}\n\nWe hope you enjoy your shopping experience at ShopNest.
            \n\nBest Regards,\nShopNest Team`;

            await sendEmail(req.user.email, 'Order Created', `Your order has been placed successfully`, message);
            res.status(201).json({ message: 'Order created successfully', order });
        }    
    } catch (error) {
        res.status(500).json({ message: 'Error creating order' });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate('products.product', 'name price');

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error getting orders',
            error
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email');

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error getting orders',
            error
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated successfully', order });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };
