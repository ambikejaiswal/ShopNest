import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

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

    const saveOrderRes = await fetch("/api/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        items: orderItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_txn_" + Date.now(),
      }),
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate("/ordersuccess");
    } else {
      const data = await saveOrderRes.json();
      console.log(data);
      alert(data.message || "Order failed.");
    }
    } catch (err) {
    console.error("ORDER ERROR:", err);
    }
  };

  const handlePayment = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
            product: item.productId,
            qty: item.qty,
            price: item.price,
      }));

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm(
          "Razorpay is not configured. Continue anyway?"
        );

        if (fallback) {
          return bypassPayment();
        }

        return;
      }

      const options = {
        key: "rzp_test_TGuwPRsa3NXNb4",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "ShopNest",
        description: "Order Payment",

        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) {
            alert("Payment verification failed.");
            return;
          }

          const saveOrderRes = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
            
            body: JSON.stringify({
              items: orderItems ,
              totalAmount: totalPrice,
              address,
              paymentId: response.razorpay_payment_id,
            }),
          });

          if (saveOrderRes.ok) {
            dispatch(clearCart());
            navigate("/ordersuccess");
          } else {
            alert("Order failed.");
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
      console.error(err);
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