import React from 'react'
import {NavLink} from 'react-router-dom';
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import '../components/css/Navbar.css'
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);



  

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <div clasSNameName="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className=" logo" to="/">Toshan Bakery</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Shop">Shop</NavLink>
          </li>
         
          <li className="nav-item">
            <NavLink className="nav-link " to="/About" >About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/Contact" >Contact</NavLink>
          </li>
        <div className="right-item">
        <div className="profile-menu">
      <FaUserCircle 
        size={30} 
        onClick={() => setShowDropdown(!showDropdown)} 
        style={{ cursor: "pointer" }} 
      />

      {showDropdown && (
        <div className="dropdown">
          {user ? (
            <>
              <p>Welcome, {user.email}</p>
              <button onClick={() => { navigate("/profile"); setShowDropdown(false); }}>Profile</button>
              <button onClick={() => { navigate("/orders"); setShowDropdown(false); }}>Orders</button>
              <button onClick={() => { navigate("/reset-password"); setShowDropdown(false); }}>Reset Yout Password</button>
              <button onClick={() => { handleLogout(); setShowDropdown(false); }}>Logout</button>
            </>
          ) : (
            <>
             <button onClick={() => { navigate("/login"); setShowDropdown(false); }}>Signup/Login</button>
            </>
          )}
        </div>
      )}
    </div>
    <div className="cart-item">
            <NavLink className="nav-link " to="/Cart" ><BsCart4 /></NavLink>
          </div>
          </div>
         
        
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}
