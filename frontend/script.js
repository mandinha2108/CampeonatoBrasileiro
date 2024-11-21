// script.js

// Função para buscar times na API e renderizar na página
async function carregarTimes() {
  try {
    const resposta = await fetch('http://localhost:3000/api/times');
    const times = await resposta.json();

    const grid = document.getElementById('teams-grid');

    times.forEach(time => {
      const card = document.createElement('div');
      card.classList.add('team-card');

      // Link que engloba o emblema e o nome
      const link = document.createElement('a');
      link.href = `detalhes.html?id=${time.time_id}`; // Redireciona para a página de detalhes
      link.style.textDecoration = 'none'; // Remove o sublinhado do link

      // Emblema do time
      const emblema = document.createElement('img');
      emblema.src = `img/${time.time_id}.png`;
      emblema.alt = `Emblema do ${time.time_nome}`;

      // Nome do time
      const nome = document.createElement('p');
      nome.classList.add('team-name');
      nome.textContent = time.time_nome;

      // Adiciona emblema e nome ao link
      link.appendChild(emblema);
      link.appendChild(nome);

      // Adiciona o link ao card
      card.appendChild(link);

      // Adiciona o card ao grid
      grid.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro ao carregar os times:', erro);
  }
}

// Função para carregar os detalhes do time
async function carregarResumoTime() {
  const params = new URLSearchParams(window.location.search);
  const timeId = params.get('id'); // Obtém o ID do time a partir da URL

  try {
    const resposta = await fetch(`http://localhost:3000/api/times/${timeId}`);
    const resumo = await resposta.json();

    const container = document.getElementById('team-summary');

    // Renderiza os dados do time
    container.innerHTML = `
      <div class="team-details">
        <img src="img/${timeId}.png" alt="Emblema do ${resumo.time_nome}">
        <h1>${resumo.time_nome}</h1>
        <p>Total de Partidas: ${resumo.total_partidas}</p>
        <p>Total de Vitórias: ${resumo.total_vitorias}</p>
        <p>Total de Empates: ${resumo.total_empates}</p>
        <p>Total de Derrotas: ${resumo.total_derrotas}</p>
      </div>
    `;
  } catch (erro) {
    console.error('Erro ao carregar o resumo do time:', erro);
  }
}

// Carrega os detalhes do time ao carregar a página de detalhes
if (window.location.pathname.endsWith('detalhes.html')) {
  document.addEventListener('DOMContentLoaded', carregarResumoTime);
}

// Carrega os times ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTimes);
