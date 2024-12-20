import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import Logout from "./pages/Logout";

// Componentă pentru a proteja rutele care necesită autentificare
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Dacă nu există token, redirecționează la login
    return <Navigate to="/login" />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirecționează implicit către /login dacă nu sunteți autentificat */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Rute protejate */}
        <Route
          path="/cart"
          element={<ProtectedRoute element={<Cart />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<Checkout />} />}
        />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
