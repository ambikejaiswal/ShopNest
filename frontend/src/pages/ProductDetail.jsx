import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/productCard.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
    if (!product) return;

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please login first');
            return;
        }

        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: product._id,
                quantity: 1,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
           alert(data.message || 'Failed to add product to cart');
           return;
        }

        // Add product to Redux cart
        dispatch(addToCart({
            _id: product._id,
            productId: product._id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl,
            qty: 1
        }));

        alert('Product successfully added to your cart!');
        } catch (error) {
            console.error('ADD TO CART ERROR:', error);
            alert('Something went wrong');
       }
    };

    if (loading) return <div  style={{ textAlign: 'center', margin: '100px', color: '#ef4444' }}>Loading...</div>
    if (!product) return <div  style={{ textAlign: 'center', margin: '100px', color: '#f97316' }}>Product Not Found</div>

    return (
        <div className='product-detail-wrapper' style={{ maxwidth: '1200px', margin: '0 auto', padding: '20px' }}>

            {/* Breadcrumb Navigation */}
            <div style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem'}}>
                <Link to="/" style={{ color: '#f97316'}}>Home</Link> / <Link to="/shop" style={{ color: '#f97316'}}>Shop</Link> / {product.category} /
                <span style={{ color: '#fff'}}>{product.name}</span>
            </div>

            <div className="product-detail">
                {/* Left Side: Image */}
                <div className='detail-image-container'>
                     <img src={product.imageUrl} alt={product.name} className="detail-image" />
                </div>

                {/* Right Side: Details */}
                <div className='detail-info'>
                    <h2 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{product.name}</h2>
                    <p className='detail-price' style={{ fontSize: '2.5rem', margin:'15px 0' }}>${product.price.toFixed(2)}</p>

                {/* Description */}
                <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '10px' }}> Product Description</h4>
                    <p style={{ color: '#fff', lineHeight: '1.8' }}>{product.description}</p>
                </div>

                {/* Add to Cart */}
                <div style={{ display: 'flex', alignItems: 'center', gap:'20px' }}>
                    <button className='btn' onClick={handleAddToCart} style={{ flexGrow:'1', padding: '18px', fontSize: '1.2rem' }}>
                        Add to Shopping Cart
                    </button>
                </div>
                </div>
            </div>
           
        </div>
    );    
};

export default ProductDetail;