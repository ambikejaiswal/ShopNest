import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './../styles/productCard.css';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
        quantity: 1
      })
    );

    alert('Product added to cart!');
  };

  return (
    <div className="product-card">

      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">

        <h2 className="product-name">
          {product.name}
        </h2>

        <p className="product-price">
          ₹{product.price.toFixed(2)}
        </p>

        <p className="product-description">
          {product.description}
        </p>

        <Link to={`/product/${product._id}`} className="view-product-btn">
          View Details
        </Link>

        <button
          onClick={handleAddToCart}
          className="add-cart-btn"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;