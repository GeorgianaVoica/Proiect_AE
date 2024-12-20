import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import api from "../api/api"; 
import { clearCart } from "../store/slices/cartSlice"; // Importă instanța configurată
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password }); // Ruta backend-ului pentru login
      localStorage.setItem("token", response.data.token); // Salvează token-ul JWT
      alert("Login successful!");
      dispatch(clearCart());

      navigate("/home");  // Redirecționează către pagina principală
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials! Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirecționează utilizatorul pe pagina de înregistrare
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default Login;
