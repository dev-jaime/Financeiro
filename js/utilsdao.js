import { serverTimestamp } from "firebase/firestore"; //busca direto do server Firestone

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