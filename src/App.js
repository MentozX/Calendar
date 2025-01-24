import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<h1>Welcome to Kalendarz App!</h1>} />
          <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
