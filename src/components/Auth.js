import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Auth = ({ isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous page or fallback to home "/"
  const from = location.state?.from?.pathname || "/";

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), { email: user.email, cart: [], orders: [] });
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      
      // Redirect back to the previous page
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
    </div>
  );
};

export default Auth;
