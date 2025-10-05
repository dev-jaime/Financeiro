// js/receitas.js

import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, prepareIdData } from "./utilsdao.js";

// referência à coleção "receitas"
const colReceitas = collection(db, "Receitas");

// Retorna todas as receitas
export async function getAllReceitas() {
  const snapshot = await getDocs(colReceitas);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getReceitasOrdenadas() {
  // Não recebidos: mais antigos primeiro
  const naoRecebidosQuery = query(
    colReceitas,
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
    colReceitas,
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
  const enriched = await prepareIdData(db, "Receitas", data);
  const docReceitas = doc(db, "Receitas", String(enriched.id));
  await setDoc(docReceitas, enriched);
  return docReceitas.id;
}
