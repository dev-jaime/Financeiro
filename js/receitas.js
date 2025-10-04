// js/receitas.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Ler todas as receitas
export async function getReceitas() {
  const snapshot = await getDocs(collection(db, "receitas"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
