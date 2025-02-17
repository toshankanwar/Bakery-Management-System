import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore";
import "../components/css/Cart.css";
import { Helmet } from "react-helmet";
import Breadcrumbs from "./Breadcrumbs";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cartData = docSnap.data().cart || [];
          setCart(cartData);
          setTotal(cartData.reduce((sum, item) => sum + item.price * item.quantity, 0));
        }
      };
      fetchCart();
    }
  }, [user]);

  const updateCartInDB = async (updatedCart) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { cart: updatedCart });
  };

  const increaseQuantity = async (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    await updateCartInDB(updatedCart);
  };

  const decreaseQuantity = async (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    await updateCartInDB(updatedCart);
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    await updateCartInDB(updatedCart);
  };

  const confirmOrder = async () => {
    if (!user || cart.length === 0) return;

    const orderRef = doc(collection(db, "orders", user.uid, "userOrders"));
    await setDoc(orderRef, {
      items: cart,
      total,
      timestamp: new Date(),
      status: "Confirmed",
    });

    setCart([]);
    setTotal(0);
    await updateCartInDB([]);

    navigate("/orders");
  };

  return (
    
    <div className="bigbasket">
      <Breadcrumbs />
      <Helmet>
        <title>Cart | Toshan Bakery</title>
      </Helmet>
      <div className="carto">
        <div className="headers">
          <span id="main">Item Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Final Price</span>
          <span>Actions</span>
        </div>
        {cart.length === 0 ? (
  <div className="empty-cart">
    <p className="noitem">No items in cart</p>
    <button className="continue-shopping" onClick={() => navigate("/shop")}>
      Continue Shopping
    </button>
  </div>
)  : (
          cart.map((item, index) => (
            <div key={index} className="list">
              <h2 className="item-main">{item.name}</h2>
              <p className="item">Rs {item.price}</p>
              <p className="item">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span id="di">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </p>
              <p className="item">Rs {item.price * item.quantity}</p>
              <button className="remove" onClick={() => removeFromCart(item.id)}>🗑️</button>
            </div>
          ))
        )}
      
      </div>
     <div className="ordery">
     {cart.length > 0 && (
          <div className="orderconfirm">
            <h2>Total Price: Rs {total}</h2>
            <button onClick={confirmOrder}>Confirm Order</button>
          </div>
        )}
     </div>
    </div>
  );
};

export default Cart;
