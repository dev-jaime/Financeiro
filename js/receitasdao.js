import { db, collection, limit, query, where, orderBy, getDocs, addDoc, setDoc, updateDoc, deleteDoc, serverTimestamp, doc } from "./firebase.js";

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
  if (typeof data.venc === "string") {
    const [ano, mes, dia] = data.venc.split("-").map(Number);
    data.venc = new Date(ano, mes - 1, dia); // <- mês começa do 0
  }
  if (!(data.venc instanceof Date) || isNaN(data.venc)) throw new Error("Campo 'venc' deve ser uma data válida. Vencimento: " + data.venc);

  const enriched = {
    ...data,
    atualizado: serverTimestamp() // adiciona timestamp automático
  };

  const docRef = await addDoc(collection(db, "Receitas"), enriched);
  return docRef.id; // retorna o id único gerado pelo Firebase
}
