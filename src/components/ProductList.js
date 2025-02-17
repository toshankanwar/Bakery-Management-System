import React from 'react';
import '../components/css/Features.css'
import { Helmet } from 'react-helmet';
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "./Breadcrumbs";
const ProductList = ({ products }) => {
   const [cart, setCart] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setCart(docSnap.data().cart);
      };
      fetchCart();
    }
  }, [user]);

  const addToCart = async (product) => {
   if (!user) return alert("Please login first!");
   
   const userRef = doc(db, "users", user.uid);
   const existingItem = cart.find((item) => item.id === product.id);
   
   let updatedCart;
   if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    await updateDoc(userRef, { cart: updatedCart });
    setCart(updatedCart);

    // Show Toastify Notification
    toast.success(`${product.name} added to cart!`, { position: "top-right" });
  };
  return (
   
    <div>
       <Helmet>

       <ToastContainer />
        <title>Shop | Toshan Bakery</title></Helmet>  
        
       <Breadcrumbs />
         <div className="product-list">
          

      {products.map((product) => (
        <div>
              <div className="product-item">    
       <div className="box-portion">
       <div class="box">
                    <div class="about">
                       <div class="heading">
                       
                    <div className="img-box img1 img1">   </div>
                    <div className="img-box img1">    <img src=
                   {product.srcs}
                         alt="img1"/></div>
                            <h3>{product.name}</h3>
                        <p>{product.des}   </p>
                       <div className="cart">
                       <h5>Rs {product.price} </h5>
                       <br></br>
             
                    <button class="addtocart"  onClick={() => addToCart(product)}> <span>Add to cart</span> <i class="fa-solid fa-cart-shopping"></i></button>
                       </div>
                       </div>  
                    </div>
            </div>
       
       </div>
        

      
        </div>
    </div>
      ))}
   
      
    </div>
    </div>
  );
};

export default ProductList;
