import { configurarHeader } from "../components/header.js";
import { buscarLojaPorId } from "../core/loja.js";
import { listarArmacoesPorLoja, listarLentesPorLoja } from "../core/produtos.js";
import { adicionarProdutoCotacao } from "../components/modalCotacao.js";
import { abrirModal,fecharModal } from "../components/modals.js";

/* =========================
   VISUALIZAÇÃO DA PÁGINA
========================= */
function getIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function carregarLoja() {
  try {
    const id = getIdDaUrl();

    if (!id) {
      alert("Loja não encontrada");
      return;
    }

    const loja = await buscarLojaPorId(id);

    document.getElementById("loja-nome").textContent = loja.nome;
    document.getElementById("loja-email").textContent = loja.email;
    document.getElementById("loja-endereco").textContent = loja.endereco;

  } catch (e) {
    console.error(e);
    alert("Erro ao carregar loja");
  }
}

async function carregarProdutos() {
  try {
    const id = getIdDaUrl();

    if (!id) {
      alert("Loja não encontrada");
      return;
    }

    const lentes = await listarLentesPorLoja(id);
    const armacoes = await listarArmacoesPorLoja(id);

    renderizarProdutos(lentes, armacoes);
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar produtos");
  }
}

function renderizarProdutos(lentes, armacoes) {
  const containerLentes = document.getElementById("lista-lentes");
  const containerArmacoes = document.getElementById("lista-armacoes");

  containerLentes.innerHTML = "";
  containerArmacoes.innerHTML = "";

  if (lentes.length === 0) {
    containerLentes.innerHTML = "<p>Nenhuma lente cadastrada.</p>";
  } else {
    lentes.forEach(lente => {
      containerLentes.appendChild(criarCardLente(lente));
    });
  }

  if (armacoes.length === 0) {
    containerArmacoes.innerHTML = "<p>Nenhuma armação cadastrada.</p>";
  } else {
    armacoes.forEach(armacao => {
      containerArmacoes.appendChild(criarCardArmacao(armacao));
    });
  }
}

/* =========================
   LÓGICA DOS PRODUTOS
========================= */

function criarCardLente(lente) {
  const div = document.createElement("div");
  div.classList.add("card-produto");

  div.innerHTML = `
    <h3>${lente.nome}</h3>
    <p><strong>Preço:</strong> R$ ${lente.preco.toFixed(2)}</p>
    <p><strong>Descrição:</strong> ${lente.descricao || ""}</p>

    <button class="btn-cotar">+ Cotar</button>
  `;

  // clique no card → abre modal
  div.addEventListener("click", () => abrirModalProduto(lente, "lente"));

  // botão → cotação direta
  div.querySelector(".btn-cotar").addEventListener("click", (e) => {
    e.stopPropagation(); // não abrir modal
    adicionarProdutoCotacao(lente, "lente");
  });

  return div;
}


function adicionarLenteACotacao(lente) {
  adicionarProdutoCotacao(lente, "lente");
}


function criarCardArmacao(armacao) {
  const div = document.createElement("div");
  div.classList.add("card-produto");

  div.innerHTML = `
    <h3>${armacao.nome}</h3>
    <p><strong>Preço:</strong> R$ ${armacao.preco.toFixed(2)}</p>
    <p><strong>Descrição:</strong> ${armacao.descricao || ""}</p>

    <button class="btn-cotar">+ Cotar</button>
  `;

  div.addEventListener("click", () => abrirModalProduto(armacao, "armacao"));

  div.querySelector(".btn-cotar").addEventListener("click", (e) => {
    e.stopPropagation();
    adicionarProdutoCotacao(armacao, "armacao");
  });

  return div;
}

function adicionarArmacaoACotacao(armacao) {
  adicionarProdutoCotacao(armacao, "armacao");
}

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener("DOMContentLoaded", () => {
  configurarHeader();
  carregarLoja();
  carregarProdutos();
  fecharModal("modal-produto"); // fecha o modal ao carregar a página para evitar que fique aberto por engano
});