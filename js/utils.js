/* Funcoes utilitarias */
export function formatCurrencyBRL(valor) {
  return Number(valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(v) {
  if (!v) return "-";
  try {
    if (typeof v.toDate === "function") return v.toDate().toLocaleDateString("pt-BR");
    return new Date(v).toLocaleDateString("pt-BR");
  } catch {
    return v;
  }
}
