import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import API from '../api/axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
      const response = await API.get('/products');
      const data = response.data;

      setProducts(data.slice(0, 4));
      } catch (error) {
      console.error(error);
      } finally {
      setLoading(false);
      }
    };

    fetchProducts();
    }, []);

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to ShopNest</h1>
        <p>ShopNest is a modern e-commerce platform that offers
            a wide range of products for sale. Browse our extensive
            collection of products and discover the best deals available.</p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;