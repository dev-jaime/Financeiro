// js/receitas.js
import { db } from "./firebase.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// referência à coleção "receitas"
const colReceitas = collection(db, "Receitas");

// Retorna todas as receitas
export async function getReceitas() {
  const snapshot = await getDocs(colReceitas);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addReceita(data) {
  const docRef = await addDoc(colReceitas, data);
  return docRef.id;
}
