import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import API from "../api/axios";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const bypassPayment = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item.productId,
        qty: item.qty,
        price: item.price,
      }));

      await API.post("/orders", {
        items: orderItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_txn_" + Date.now(),
      });

      dispatch(clearCart());
      navigate("/ordersuccess");
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert(err.response?.data?.message || "Order failed.");
    }
  };

  const handlePayment = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item.productId,
        qty: item.qty,
        price: item.price,
      }));

      // Create Razorpay order
      const orderRes = await API.post("/payment/order", {
        amount: totalPrice,
      });

      const orderData = orderRes.data;

      const options = {
        key: "rzp_test_TGuwPRsa3NXNb4",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "ShopNest",
        description: "Order Payment",

        handler: async function (response) {
          try {
            // Verify Razorpay payment
            await API.post("/payment/verify", response);

            // Save order in database
            await API.post("/orders", {
              items: orderItems,
              totalAmount: totalPrice,
              address,
              paymentId: response.razorpay_payment_id,
            });

            dispatch(clearCart());
            navigate("/ordersuccess");
          } catch (err) {
            console.error("PAYMENT/ORDER ERROR:", err);
            alert(
              err.response?.data?.message ||
                "Payment verification or order failed."
            );
          }
        },

        prefill: {
          name: address.fullName,
          email: address.email,
          contact: "9999999999",
        },

        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("PAYMENT ERROR:", err);

      const fallback = window.confirm(
        "Razorpay is not configured. Continue anyway?"
      );

      if (fallback) {
        return bypassPayment();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={address.email}
            onChange={(e) =>
              setAddress({ ...address, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />

          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>

            <button type="submit" className="btn">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;