import { getReceitas } from "./receitas.js";

async function carregar() {
  const receitas = await getReceitas();
  renderGrid(receitas);
}

function renderGridReceitas(receitas) {
  const tbody = document.querySelector("#gridReceitas tbody");
  tbody.innerHTML = ""; // limpa antes de renderizar

  receitas.forEach(r => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${r.descricao ?? ""}</td>
      <td>${Number(r.valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
      <td>${r.data ?? ""}</td>
    `;

    tbody.appendChild(tr);
  });
}

carregar();
