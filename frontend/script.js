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

      // Emblema do time (usando o time_id para construir o caminho da imagem)
      const emblema = document.createElement('img');
      emblema.src = `img/${time.time_id}.png`; // Caminho para a imagem na pasta img/
      emblema.alt = `Emblema do ${time.time_nome}`;

      // Nome do time
      const nome = document.createElement('p');
      nome.classList.add('team-name');
      nome.textContent = time.time_nome;

      // Adiciona os elementos ao card
      card.appendChild(emblema);
      card.appendChild(nome);

      // Adiciona o card ao grid
      grid.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro ao carregar os times:', erro);
  }
}

// Carrega os times ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTimes);
