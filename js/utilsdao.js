import { collection, limit, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
export { collection, limit, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp }

export async function prepareIdData(db, collectionName, data) {
  const colRef = collection(db, collectionName);

  // busca último id da coleção
  const q = query(colRef, orderBy("id", "desc"), limit(1));
  const snapshot = await getDocs(q);

  let newId = 1;
  if (!snapshot.empty) {
    const lastDoc = snapshot.docs[0];
    newId = (lastDoc.data().id || 0) + 1;
  }

  // retorna o data enriquecido
  return {
    ...data,
    id: newId,
    atualizado: serverTimestamp()
  };
}