import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCXuC2XRuY1vRRa8r6MI2wTJgqtcilhUNY",
  authDomain: "inventory-manage-ffb30.firebaseapp.com",
  projectId: "inventory-manage-ffb30",
  storageBucket: "inventory-manage-ffb30.appspot.com",
  messagingSenderId: "215175024657",
  appId: "1:215175024657:web:b8ade1ba018a4f1c9ce1b0",
  measurementId: "G-PGT3L0VG74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () =>{
         
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        const name = result.user.displayName
        const email = result.user.email

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)

    
    })
    .catch((error) => {
        console.log(error)
    })

};