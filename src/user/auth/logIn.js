import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { userAuth } from "../firebase";

// firebase authentication signIn poppup
export const logIn = async ( provider ) => {
  const errorMassage = "";
  try {
    const res = await signInWithPopup(userAuth, provider);
    const user = res.user;
    return user;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
