import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    };

    const handleUpdateQty = (item, qty) => {
        if (qty > 0) {
            dispatch(addToCart({
                ...item,
                qty: Number(qty)
            }));
       }
   };
    
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
        ) : (
            <div className="cart-layout">
                <div className="cart-items">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.productId}>
                        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>₹{item.price}</p>
                            <div className="qty-controls">
                                <button onClick={() => handleUpdateQty(item, item.qty - 1)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => handleUpdateQty(item, item.qty + 1)}>+</button>
                            </div>
                                <button onClick={() => handleRemove(item.productId)} className="remove-btn"> Remove </button>
                        </div>
                    </div>
                ))}
                </div>
                {/* Cart Summary */}
                <div className="cart-summary">
                    <h3>Cart Summary</h3>
                    <div className="cart-summary-items">
                        {cartItems.map((item) => (
                            <div className="cart-summary-item" key={item.productId}>
                                <img src={item.imageUrl} alt={item.name} className="cart-summary-item-image" />
                                <div className="cart-summary-item-details">
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price * item.qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                        <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Checkout</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Cart;