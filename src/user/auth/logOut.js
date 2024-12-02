import {
    signOut,
} from "firebase/auth";
import { userAuth } from "../firebase";

export function logOut() {
    console.log('signed out!'); 
    signOut(userAuth);
}; 