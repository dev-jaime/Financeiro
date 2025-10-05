// js/receitas.js
import { db } from "./firebase.js";
import { prepareIdData } from "./utilsdao.js";
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// referência à coleção "receitas"
const colReceitas = collection(db, "Receitas");

// Retorna todas as receitas
export async function getAllReceitas() {
  const snapshot = await getDocs(colReceitas);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const colRef = collection(db, "Receitas");

export async function getReceitasOrdenadas() {
  // Não recebidos: mais antigos primeiro
  const naoRecebidosQuery = query(
    colRef,
    where("recebido", "==", false),
    orderBy("venc", "asc")
  );
  const naoRecebidosSnap = await getDocs(naoRecebidosQuery);
  const naoRecebidos = naoRecebidosSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Recebidos: mais recentes primeiro
  const recebidosQuery = query(
    colRef,
    where("recebido", "==", true),
    orderBy("venc", "desc")
  );
  const recebidosSnap = await getDocs(recebidosQuery);
  const recebidos = recebidosSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Junta os dois blocos
  return [...naoRecebidos, ...recebidos];
}

export async function addReceita(data) {
  const enriched = await prepareDataWithId(db, "Receitas", data);
  const docRef = doc(db, "Receitas", String(enriched.id));
  await setDoc(docRef, enriched);
  return docRef.id;
}
