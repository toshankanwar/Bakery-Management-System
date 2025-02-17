import React, { useState } from "react";
import { auth } from "../firebase"; // Ensure Firebase is initialized
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./css/ResetPassword.css"; // Add styles for better UI

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError("Failed to send reset link. Check your email and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <p>Enter your email to receive a password reset link.</p>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button class="submit" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <button className="back-btn" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
};

export default ResetPassword;
