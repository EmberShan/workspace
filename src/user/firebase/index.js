// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUNSMQX7PyAHrcmq3SvZbRxYklAaY2mh0",
  authDomain: "work-space-6d29b.firebaseapp.com",
  projectId: "work-space-6d29b",
  storageBucket: "work-space-6d29b.appspot.com",
  messagingSenderId: "475005533326",
  appId: "1:475005533326:web:fd110ff1c805e979255ddf"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const userAuth = getAuth(app);
// firebase.auth.languageCode = firebase.auth().useDeviceLanguage();

// export 
export default app;
export { db, userAuth };


