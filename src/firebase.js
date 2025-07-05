import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiY9R1YGwZmk_wmCSV21pTZ1afWQWDPT0",
  authDomain: "kleistic.firebaseapp.com",
  projectId: "kleistic",
  storageBucket: "kleistic.firebasestorage.app",
  messagingSenderId: "141891489127",
  appId: "1:141891489127:web:d1132f1e79b78568b9b3c2",
  measurementId: "G-1WKZM9EP4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };