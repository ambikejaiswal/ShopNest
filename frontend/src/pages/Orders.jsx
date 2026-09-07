import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("GET ORDERS ERROR:", error);
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
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>

            <p>
              Total: ₹{order.totalAmount}
            </p>

            <p>
              Status: {order.status}
            </p>

            <h4>Products:</h4>

            {order.products.map((item) => (
              <div key={item._id}>
                <p>
                  {item.product?.name || "Product"} × {item.qty}
                </p>

                <p>Price: ₹{item.price}</p>
              </div>
            ))}

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;