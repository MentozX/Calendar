import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      })
      .catch((error) => {
        alert("Niepomyślne wylogowanie: " + error.message);
      });
  };

  return (
    <nav className="navbar">
      <h1>Calendary app</h1>
      <div className="navbar-buttons">
        <button
          className="nav-button"
          onClick={() => navigate("/calendar")}
        >
          Calendar
        </button>
        <button
          className="nav-button"
          onClick={() => navigate("/about")}
        >
          Description
        </button>
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
