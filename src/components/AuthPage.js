import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../components/css/AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Login / Signup
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Fix: Initialize Firestore document with empty cart array
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          cart: [],
        });

        setMessage("Account created successfully! Redirecting to login...");
        
        // ✅ Redirect to Login Page after 2 seconds
        setTimeout(() => {
          setIsSignUp(false);
        }, 2000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Reset
  const handleForgotPassword = () => {
    navigate("/reset-password"); // Redirect to the Reset Password page
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
        
        <form onSubmit={handleAuth}>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" disabled={loading}>{loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}</button>
        </form>

        <p className="switch-text">
          {isSignUp ? "Already have an account?" : "New here?"} 
          <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? " Login" : " Sign Up"}</span>
        </p>

        {!isSignUp && <p className="forgot-text" onClick={handleForgotPassword}>Forgot Password?</p>}
      </div>
    </div>
  );
};

export default AuthPage;
