import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD1fgOF0S_wN_xMxGWUn2jlg-pX996mzHo",
  authDomain: "miniblog-f9153.firebaseapp.com",
  projectId: "miniblog-f9153",
  storageBucket: "miniblog-f9153.appspot.com",
  messagingSenderId: "988017161519",
  appId: "1:988017161519:web:d67b3cb67721d26a185dda",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
