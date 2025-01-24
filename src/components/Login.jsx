import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/calendar");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Nie masz konta?{" "}
        <a href="/register" className="register-button">
          Zarejestruj się tutaj
        </a>
      </p>
    </div>
  );
};

export default Login;
