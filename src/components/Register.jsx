import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/calendar");
    } catch (err) {
      setError("Niepomyślna rejestracja. Spróbuj ponownie.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
