var page = {
  database: firebase.database(),
  databaseRef: '/atletas/',
  linhasAtleta: //peguei la o id linha atleta
  templateLinha: //mandinga pra pegar o templatelinha
  nomeAtleta: "Felipe",
  sobrenomeAtleta: "Guimarães",
  posicao: "Atacante",
  idade: 24,
  categoria: "Profissional",
  clube: "",
  cidade: "São Gonçalo",
  pais: "Brasil",
  foto: "url('campo-futebol.jpg')",
  atletaBtn: document.querySelector('#novo-atleta')
}

function preencheTabelaAtletas() {
  var atletas = getAtletas();
  linhasAtleta.innerHTML = "";
  var linhaNova;
  atletas.forEach(function (atleta) {
    linhaNova = templateLinha.cloneNode()
    linhaNova.removeHidden;
    linhaNova.querySelector('.nome-atle....').text = atleta.nome;
    /*
    depois que preencher todo mundo
    */
    linhasAtleta.addChild(linhaNova);
  });
}

function getAtletas() {
  var atletas = [];

  page.database.ref(page.databaseRef).once('value').then(function(snapshot) {
    console.log(snapshot.val());
    snapshot.val().forEach(function(atleta) {
      var idAtleta = 1 //gambiarra pra pegar o id
      atleta.id = idAtleta;
      atletas.push(atleta);
    });
    return atletas;
  })
}

function getAtletasById(idAtleta) {

  return page.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().idAtleta;
  })
}

function getAtletasByNome() {
  page.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().forEach(function(atleta) {
      console.log(atleta);
    });
  });
}

function salvaModal() {
  var atleta = {
    nome: page.nomeField.textContent,
    sobrenome: page.sobrenomeField.textContent
  };
  novoAtleta(atleta);
}

function salvaAlteracoes(atleta) {
  atleta.nome = page.nomeField.textContent;
  atleta.sobrenome = page.sobrenomeField.textContent;
  .
  .
  .

  editarAtleta(atleta);

}

function novoAtleta(atleta) {
  page.database.ref(page.databaseRef).push().set(atleta);
}

function editarAtleta(atleta) {
  page.database.ref().update(atleta);
}

function excluirAtleta(atleta) {
  page.database.ref('atletas/' + atleta.id).remove();
}
page.atletaBtn.addEventListener('click', getAtletasByNome);

page.abreListaAtleta(){

}
