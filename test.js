const fs = require('fs');
const moment = require('moment');

// Função para adicionar um novo grupo ao arquivo JSON
function adicionarGrupo(id) {
  const grupos = carregarGrupos();

  const dataTermino = moment().add(30, 'days').format('YYYY-MM-DD');

  grupos[id] = {
    dataTermino: dataTermino,
  };

  salvarGrupos(grupos);
}

// Função para verificar se é o dia de sair ou se já passou a data de término
function verificarData(id) {
  const grupos = carregarGrupos();

  if (grupos[id]) {
    const dataTermino = moment(grupos[id].dataTermino);
    const hoje = moment();

    if (hoje.isSameOrAfter(dataTermino, 'day')) {
      // Remover o bot do grupo, pois a data de término já passou
      console.log(`Removendo o bot do grupo ${id}`);
      // Coloque aqui a lógica para remover o bot do grupo
      delete grupos[id];
      salvarGrupos(grupos);
    } else if (hoje.isSame(dataTermino, 'day')) {
      console.log(`Hoje é o último dia do aluguel para o grupo ${id}`);
    } else {
      console.log(`Ainda não é o dia de sair para o grupo ${id}`);
    }
  } else {
    console.log(`Grupo ${id} não encontrado`);
  }
}

// Função para carregar os grupos do arquivo JSON
function carregarGrupos() {
  try {
    const data = fs.readFileSync('grupos.json');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Função para salvar os grupos no arquivo JSON
function salvarGrupos(grupos) {
  fs.writeFileSync('grupos.json', JSON.stringify(grupos, null, 2));
}

// Exemplo de uso para o caso "verificar"
const idVerificar = '120363197644820573@g.us';
verificarData(idVerificar);

// Exemplo de uso para o caso "test"
const idTest = '456@g.us';
adicionarGrupo(idTest);
