const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const { addToCart, getCart, updateCartQuantity, removeFromCart, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.put('/:productId', protect, updateCartQuantity);
router.delete('/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;