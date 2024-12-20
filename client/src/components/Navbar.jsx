import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Tesco dupe</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="navbar-link">Home</Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/cart" className="navbar-link">Cart</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
