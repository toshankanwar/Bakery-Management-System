import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import "../components/css/Profile.css"; // Add CSS styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // ✅ Fixed fetchOrders function
  const fetchOrders = async (userId) => {
    try {
      const ordersRef = collection(db, "orders", userId, "userOrders");
      const snapshot = await getDocs(ordersRef);
  
      const ordersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date ? data.date.toDate() : null, // ✅ Properly convert Firestore Timestamp
        };
      });
  
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (!user) return null; // Prevent rendering before user data loads

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.uid}</p>
      </div>

      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> Rs {order.total}</p>
        
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x Rs {item.price} = Rs {item.quantity * item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
