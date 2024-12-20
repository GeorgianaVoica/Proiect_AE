import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import axios from "axios";
import './Checkout.css';

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  //const [card, setCard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const cart = useSelector((state) => state.cart.items); // Obține coșul din Redux Store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    try {
      const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0); // Calcul total
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("You need to log in to place an order.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/orders",
        {
          name,
          address,
          paymentMethod,
          items: cart,
          total, // Total calculat
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token-ul JWT
          },
        }
      );
  
      alert("Order placed successfully!");
      dispatch(clearCart())
      navigate(`/order/${response.data.orderId}`);
      navigate("/home");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };
  

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout} className="checkout-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="checkout-input"
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="checkout-input"
          />
        </label>
        <br />
        <label className="payment-method-label">
          Payment Method:
          <div className="payment-method-options">
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="checkout-radio"
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="checkout-radio"
              />
              Card
            </label>
          </div>
        </label>
        <br />
        <button type="submit" className="checkout-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
