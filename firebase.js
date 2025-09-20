import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf6HBkVhFucws5pPjbnKeqMJb-6f7T72I",
  authDomain: "risaa-bookstore.firebaseapp.com",
  projectId: "risaa-bookstore",
  storageBucket: "risaa-bookstore.firebasestorage.app",
  messagingSenderId: "766485210266",
  appId: "1:766485210266:web:1f49f8aa4a487254fbab23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };