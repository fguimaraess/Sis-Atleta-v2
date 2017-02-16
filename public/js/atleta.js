var page = {
  database: firebase.database(),
  databaseRef: 'atletas/',
  linhasAtleta: //peguei la o id linha atleta
  templateLinha: //mandinga pra pegar o templatelinha
  nomeField: "Felipe",
  sobrenomeField: "Guimarães",
  posicaoField: "Atacante",
  idadeField: 24,
  categoriaField: "Profissional",
  clubeField: "",
  cidadeField: "São Gonçalo",
  paisField: "Brasil",
  fotoField: "url('campo-futebol.jpg')",
  atletaBtn: document.querySelector('#novo-atleta')
}

function novoAtleta(atleta){
    page.database.ref('/atletas/' + atleta.atletaId).set(atleta);
}

//OK
function criaAtleta(){
var myId = page.database.ref('/atletas/').push();
var newId = myId.key;
  var atleta = {
  atletaId: newId,
  nome: page.nomeAtleta,
  sobrenome: page.sobrenomeField,
  posicao: page.posicaoField,
  idade: page.idadeField,
  categoria: page.categoriaField,
  clube: page.clubeField,
  cidade: page.cidadeField,
  pais: page.paisField,
  foto: page.fotoField,
  }
  console.log("ID GERADO: " + newId);
  novoAtleta(atleta);
}

page.atletaBtn.addEventListener('click', criaAtleta);

//Testando o getAtletasByNome
var testeGetByNome = {
    atletaId: "-Kd6-Riwd6LgtLDY_xpK",
    nome: page.nomeAtleta,
    sobrenome: page.sobrenomeField,
    posicao: page.posicaoField,
    idade: page.idadeField,
    categoria: page.categoriaField,
    clube: page.clubeField,
    cidade: page.cidadeField,
    pais: page.paisField,
    foto: page.fotoField
}
//OK
function getAtletasByNome(atleta) {
  page.database.ref(page.databaseRef + atleta.atletaId).once('value').then(function(snapshot) {
    snapshot.forEach(function(atleta) {
        console.log(atleta.val());
    });
  });
}

//OK
function getAtletas(){
    page.database.ref(page.databaseRef).once('value').then(function(snapshot){
        snapshot.forEach(function (atleta){
            var id = atleta.val().atletaId;
            console.log("ESSE É O ID do Atleta " + atleta.val().nome + ": " + id);
            console.log(atleta.val());
        });
    });
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
    snapshot.forEach(function(atleta) {
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

function editarAtleta(atleta) {
  page.database.ref().update(atleta);
}

function excluirAtleta(atleta) {
  page.database.ref('atletas/' + atleta.id).remove();
}
page.atletaBtn.addEventListener('click', getAtletasByNome);

page.abreListaAtleta(){

}
