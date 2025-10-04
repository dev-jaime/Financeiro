/* Funcoes utilitarias */
function formatCurrencyBRL(valor) {
  return Number(valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(v) {
  if (!v) return "-";
  try {
    if (typeof v.toDate === "function") return v.toDate().toLocaleDateString("pt-BR");
    return new Date(v).toLocaleDateString("pt-BR");
  } catch {
    return v;
  }
}

/* Funcoes de banco de dados */
import { getReceitas } from "./receitas.js";

function renderReceitas(receitas) {
  const tbody = document.getElementById("tbodyReceitas");
  tbody.innerHTML = "";

  receitas.forEach(r => {
    const tr = document.createElement("tr");
    tr.dataset.id = r.id;

    // coluna delete
    const tdDelete = document.createElement("td");
    tdDelete.className = "delete-cell";
    tdDelete.innerHTML = '<span class="delete-icon">🗑️</span>';
    tdDelete.style.cursor = "pointer";
    tr.appendChild(tdDelete);

    // coluna descrição (2 colunas = id oculto + descrição visível)
    const tdDesc = document.createElement("td");
    tdDesc.className = "descricao-cell";
    tdDesc.textContent = r.descricao ?? "";
    tr.appendChild(tdDesc);

    // valor
    const tdValor = document.createElement("td");
    tdValor.textContent = formatCurrencyBRL(r.valor);
    tr.appendChild(tdValor);

    // vencimento
    const tdVenc = document.createElement("td");
    tdVenc.textContent = r.venc ? formatDate(r.venc) : "-";
    tr.appendChild(tdVenc);

    // recebido toggle
    const tdRecebido = document.createElement("td");
    tdRecebido.className = "recebido-cell";
    tdRecebido.innerHTML = `<span class="recebido-icon" style="cursor:pointer">
      ${r.recebido ? "✔️" : "❌"}
    </span>`;
    tr.appendChild(tdRecebido);

    tbody.appendChild(tr);
  });
}

async function carregarReceitas() {
  try {
    const receitas = await getReceitas();
    renderReceitas(receitas);
  } catch (err) {
    console.error("Erro ao carregar receitas:", err);
  }
}

// executa ao abrir a página
carregarReceitas();
