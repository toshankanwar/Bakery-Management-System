import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbiySI532ehiIxLAlBkrVQnTB3Q_WOQik",
  authDomain: "bakery-2a5f0.firebaseapp.com",
  projectId: "bakery-2a5f0",
  storageBucket: "bakery-2a5f0.firebasestorage.app",
  messagingSenderId: "260486492473",
  appId: "1:260486492473:web:b02033abc892a1078378e8",
  measurementId: "G-GC5YSBXTS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable persistent authentication
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled.");
  })
  .catch((error) => {
    console.error("Error enabling auth persistence:", error);
  });

export { auth, db };
