import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Kalendarz</h1>
      <p>Efektywne planowanie zadań.</p>
      <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
        <button style={{ padding: "10px 20px", backgroundColor: "#4caf50", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
          Register Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
