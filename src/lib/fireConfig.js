import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrvflLiG8EJ5cvIyYVA7O4oFiwsu6Bkz4",
  authDomain: "svelte-fire-32e1e.firebaseapp.com",
  projectId: "svelte-fire-32e1e",
  storageBucket: "svelte-fire-32e1e.appspot.com",
  messagingSenderId: "170514285371",
  appId: "1:170514285371:web:d84103219f71d7b36bad1e"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
