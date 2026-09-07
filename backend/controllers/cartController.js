const Cart = require('../model/Cart');
const Product = require('../model/Product');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: req.user._id
        });

        // If cart doesn't exist, create it
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1
                    }
                ]
            });

            const savedCart = await cart.save();

            return res.status(201).json(savedCart);
        }

        // Check whether product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        const updatedCart = await cart.save();

        res.json(updatedCart);

    } catch (error) {
        console.error('ADD TO CART ERROR:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate('items.product');

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        res.json(cart);

    } catch (error) {
        console.error('GET CART ERROR:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

//Update cart item quantity

const updateCartQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: 'Quantity must be at least 1'
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: 'Product not found in cart'
            });
        }

        item.quantity = quantity;

        const updatedCart = await cart.save();

        res.json(updatedCart);

    } catch (error) {
        console.error('UPDATE CART ERROR:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

//delete/remove item from cart

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const itemExists = cart.items.some(
            (item) => item.product.toString() === productId
        );

        if (!itemExists) {
            return res.status(404).json({
                message: 'Product not found in cart'
            });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        const updatedCart = await cart.save();

        res.json(updatedCart);

    } catch (error) {
        console.error('REMOVE FROM CART ERROR:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

// Delete whole cart

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        cart.items = [];

        const updatedCart = await cart.save();

        res.json({
            message: 'Cart cleared successfully',
            cart: updatedCart
        });

    } catch (error) {
        console.error('CLEAR CART ERROR:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
};
