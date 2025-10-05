/* Funcoes utilitarias */
import * as Utils from "./utils.js";
/* Funcoes de banco de dados */
import { getReceitas, addReceita } from "./receitasdao.js";

const tbody = document.getElementById("tbodyReceitas");
const btnAddRec = document.getElementById("btnAddRec");
const inpDescRec = document.getElementById("inpDescRec");
const inpValorRec = document.getElementById("inpValorRec");
const inpVencRec = document.getElementById("inpVencRec");

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
    console.log("receitas: ", receitas);
    renderReceitas(receitas);
  } catch (err) {
    console.error("Erro ao carregar receitas:", err);
  }
}

async function handleAddReceita() {
  const descricao = inpDescRec.value.trim();
  const valor = parseFloat(inpValorRec.value);
  const venc = inpVencRec.value;
 
  if (!descricao) { showAlert("Informe uma descrição!"); return; }
  if (isNaN(valor) || valor <= 0) { showAlert("Informe um valor válido!"); return; }
  if (!vencStr) { showAlert("Informe uma data de vencimento válida!"); return; }

  await addReceita({ descricao, valor, venc, recebido: false });
  inpDescRec.value = "";
  inpValorRec.value = "";
  inpVencRec.value = "";
  carregarReceitas(); // recarrega a tabela
}

btnAddRec.addEventListener("click", handleAddReceita);

// executa ao abrir a página
carregarReceitas();
