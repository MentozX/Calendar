// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA_bssLlKlVz4io8NeVuhJxE3-eC3e_WY",
  authDomain: "kalendarz-bf12a.firebaseapp.com",
  projectId: "kalendarz-bf12a",
  storageBucket: "kalendarz-bf12a.firebasestorage.app",
  messagingSenderId: "108503353677",
  appId: "1:108503353677:web:01079f914f4871efd4cf04",
  measurementId: "G-GQRF2XQF0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
