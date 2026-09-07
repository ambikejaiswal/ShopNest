import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error("GET ORDERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        status,
      });

      alert("Order status updated successfully");

      fetchOrders();
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
      alert(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  if (!user || user.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  return (
    <div className="admin-orders-container">
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">

            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment ID:</strong>{" "}
              {order.paymentId}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address.fullName},{" "}
              {order.address.street},{" "}
              {order.address.city},{" "}
              {order.address.postalCode},{" "}
              {order.address.country}
            </p>

            <h4>Products:</h4>

            {order.products.map((item) => (
              <div key={item._id}>
                <p>
                  Product ID: {item.product}
                </p>

                <p>
                  Quantity: {item.qty} | Price: ₹{item.price}
                </p>
              </div>
            ))}

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>

          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;