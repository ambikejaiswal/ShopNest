import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/myorders");

        setOrders(response.data);
      } catch (error) {
        console.error("MY ORDERS ERROR:", error);
        console.error(
          error.response?.data?.message || "Failed to fetch orders"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment ID:</strong> {order.paymentId}</p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div key={item._id}>
                <p>
                  Product: {item.product?.name || "Product"}
                </p>

                <p>
                  Quantity: {item.qty}
                </p>

                <p>
                  Price: ₹{item.price}
                </p>
              </div>
            ))}

            <h4>Shipping Address</h4>

            <p>{order.address.fullName}</p>
            <p>{order.address.street}</p>

            <p>
              {order.address.city} - {order.address.postalCode}
            </p>

            <p>{order.address.country}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;