import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
export { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp };

export async function prepareIdData(db, collectionName, data) {
  const colRef = db.collection(collectionName);

  // busca último id da coleção
  const lastQuery = await colRef.orderBy("id", "desc").limit(1).get();
  let newId = 1;
  if (!lastQuery.empty) {
    const lastDoc = lastQuery.docs[0];
    newId = (lastDoc.data().id || 0) + 1;
  }

  // retorna o data enriquecido
  return {
    ...data,
    id: newId,
    atualizado: serverTimestamp()
  };
}