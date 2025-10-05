// js/receitas.js
import { db } from "./firebase.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Retorna todas as receitas
export async function getReceitas() {
  const snapshot = await getDocs(collection(db, "Receitas"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addReceita(data) {
  const docRef = await addDoc(colecaoReceitas, data);
  return docRef.id;
}
