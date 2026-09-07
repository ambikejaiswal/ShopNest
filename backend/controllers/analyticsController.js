const Order = require('../model/Order');
const Product = require('../model/Product');
const User = require('../model/User');

//get admin stats
const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({role: 'user'});
        const totalProducts = await Product.countDocuments({});
        const totalUsers = await User.countDocuments({});

        const orders = await Order.find({});
        const totalRevenueDate = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        res.json({ totalOrders, totalProducts, totalUsers, totalRevenueDate });
    } catch (error) {
        res.status(500).json({ message: 'Error getting admin stats' });
    }
};

module.exports = { getAdminStats };