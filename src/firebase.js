// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCOddGCeYmuj-QyUP1xOpm8GQViTuGo2v0",
    authDomain: "secret-santa-da348.firebaseapp.com",
    projectId: "secret-santa-da348",
    storageBucket: "secret-santa-da348.appspot.com",
    messagingSenderId: "623914708535",
    appId: "1:623914708535:web:ce06125744859a3d9859b2",
    measurementId: "G-ZFNKFHLLQK"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
