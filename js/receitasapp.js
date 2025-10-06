/* Funcoes utilitarias */
import * as Utils from "./utils.js";
/* Funcoes de banco de dados */
import { getAllReceitas, getReceitasOrdenadas, addReceita, updateReceita, deleteReceita } from "./receitasdao.js";

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
    tdDesc.contentEditable = true;

    // ao clicar, seleciona todo o texto (apenas na primeira vez)
    tdDesc.addEventListener("click", () => {
      if (!tdDesc._clickedOnce) {
        const range = document.createRange();
        range.selectNodeContents(tdDesc);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        tdDesc._clickedOnce = true;
      }
    });

    // ao perder foco, salva se houver mudança
    tdDesc.addEventListener("blur", () => {
      const novo = tdDesc.textContent.trim();
      const id = tr.dataset.id;

      if (novo !== r.descricao) {
        if (!novo) { showAlert("Informe uma descrição!"); return; }
        r.descricao = novo;
        salvarReceita(id, { descricao: novo });
      }

      // reseta flag de clique
      tdDesc._clickedOnce = false;
    });

    // ao pressionar Enter, força blur para salvar imediatamente
    tdDesc.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        tdDesc.blur();
      }
    });

    tr.appendChild(tdDesc);

    // valor
    const tdValor = document.createElement("td");
    tdValor.textContent = Utils.formatCurrencyBRL(r.valor);
    tr.appendChild(tdValor);

    // vencimento
    const tdVenc = document.createElement("td");
    tdVenc.textContent = r.venc ? Utils.formatDate(r.venc) : "-";
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
    const receitas = await getReceitasOrdenadas();
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
  if (!venc) { showAlert("Informe uma data de vencimento válida!"); return; }
  
  await addReceita({ descricao, valor, venc, recebido: false });
  inpDescRec.value = "";
  inpValorRec.value = "";
  inpVencRec.value = "";
  carregarReceitas(); // recarrega a tabela
}

btnAddRec.addEventListener("click", handleAddReceita);

// delegação de eventos
tbody.addEventListener("click", async (e) => {
  const target = e.target;
  const tr = target.closest("tr");
  if (!tr) return;

  const id = tr.dataset.id; // id único do Firestore

  if (target.classList.contains("recebido-icon") || target.closest(".recebido-cell")) {
    const span = target.classList.contains("recebido-icon") ? target : target.querySelector(".recebido-icon");
    if (!span) return;
    const trToggle = span.closest("tr");
    //const id = trToggle.dataset.id;
    const status = span.textContent.includes("❌");
    span.textContent = status ? "✔️" : "❌";

    await updateReceita(id, { recebido: status });
    carregarReceitas();
  }

  // clique no ícone de deletar
  if (target.classList.contains("delete-icon") || target.classList.contains("delete-cell")) {
    const descricao = tr.querySelector(".descricao-cell")?.textContent.trim() || "";
    showConfirm(`Deseja excluir a receita "${descricao}"?`, async () => {
      try {
        // otimista: remove imediatamente do DOM
        removerReceitaDOM(id);

        // dispara no Firestore
        await deleteReceita(id);

        console.log(`Receita ${id} removida com sucesso`);
      } catch (err) {
        console.error("Erro ao excluir receita:", err);

        // rollback → recarregar lista do servidor
        await carregarReceitas();
        showAlert("Erro ao excluir receita: " + (err?.message || err));
      }
    });
  }
});

function removerReceitaDOM(id) {
  const tr = tbody.querySelector(`tr[data-id="${id}"]`);
  if (tr) tr.remove();
}

// executa ao abrir a página
carregarReceitas();
