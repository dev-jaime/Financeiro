// firebase.js

// --- Configuração Firebase ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Configurações do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyDW_d--tsJlKVABAe37tEQZZeQgJCztMQs",
  authDomain: "financeiro-46b8e.firebaseapp.com",
  projectId: "financeiro-46b8e",
  storageBucket: "financeiro-46b8e.firebasestorage.app",
  messagingSenderId: "213056902447",
  appId: "1:213056902447:web:24531f291520aa0afbfdda"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Exporta tudo que for precisar nos outros arquivos ---
export {
  db,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc
};
