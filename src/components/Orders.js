import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "../components/css/Order.css";
import { Helmet } from "react-helmet";
import Breadcrumbs from "./Breadcrumbs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const ordersRef = collection(db, "orders", user.uid, "userOrders");
      const snapshot = await getDocs(ordersRef);
      const ordersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        };
      });

      setOrders(ordersList);
    };

    fetchOrders();
  }, [user]);

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    if (!user) return;

    const orderRef = doc(db, "orders", user.uid, "userOrders", orderId);
    await deleteDoc(orderRef);

    // Update UI by removing deleted order
    setOrders(orders.filter((order) => order.id !== orderId));

    // Show toast notification
    toast.success("Order deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="order-container">
      <ToastContainer />
      <Breadcrumbs />
      <Helmet>
        <title>My Orders | Toshan Bakery</title>
      </Helmet>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>Order ID: {order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: Rs {order.total}</p>
            <p>Order Date: {order.timestamp.toLocaleDateString()}</p>
            <p>Order Time: {order.timestamp.toLocaleTimeString()}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x Rs {item.price} = Rs{" "}
                  {item.quantity * item.price}
                </li>
              ))}
            </ul>
            <button className="delete-btn" onClick={() => deleteOrder(order.id)}>
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
