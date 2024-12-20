import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, removeFromCart, updateCart } from "../store/slices/cartSlice";
import { getCart, removeFromCart as removeApi, updateCart as updateApi } from "../api/cartApi";
import { useNavigate } from "react-router-dom"; 
import './Cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //total cos
  const totalCartPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCart();
      dispatch(setCart(cartData));
    };

    fetchCart();
  }, [dispatch]);

  const handleRemove = async (productId) => {
    await removeApi(productId);
    dispatch(removeFromCart(productId));
  };

  const handleUpdate = async (productId, quantity, price, title) => {
    await updateApi(productId, quantity, price, title);
    dispatch(updateCart({ productId, quantity, price, title }));
  };

  const handleCheckoutRedirect = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some products before proceeding to checkout.");
      return;
    }
    navigate("/checkout"); // Redirecționează către pagina de checkout
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.productId} className="cart-item">
                <h3>{item.title}</h3>
                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                <p>Price: {item.price} RON</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {item.quantity * item.price} RON</p>
                <button className="remove-btn" onClick={() => handleRemove(item.productId)}>-</button>
                <button className="update-btn" onClick={() => handleUpdate(item.productId, item.quantity + 1, item.price, item.title)}>+</button>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Total Cart Price: {totalCartPrice.toFixed(2)} RON</h3>
          <button className="checkout-btn" onClick={handleCheckoutRedirect}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
