var page = {
  database: firebase.database(),
  databaseRef: 'atletas/',
  linhasAtleta: 'a', //VER C LUIZ
  templateLinha: 'b', //VER C LUIZ
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

function novoAtleta(atleta) {
  page.database.ref('/atletas/').push(atleta);
}

//OK
function criaAtleta() {
  var atleta = {
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
  novoAtleta(atleta);
}

page.atletaBtn.addEventListener('click', function () {
  var atleta = {nome: "Luiz"};
  getAtletas();
});

//OK
function getAtletasByNome(mozao) {
  var atletas = [];
  page.database.ref(page.databaseRef).once('value').then(function(snapshot) {
    snapshot.forEach(function(atletaRef) {
      if(mozao.nome == atletaRef.val().nome){

        var tempAtleta = atletaRef.val();
        tempAtleta.uid = atletaRef.key;
        atletas.push(tempAtleta);

      }
    });
     console.log(atletas);
  });
}

//OK
function getAtletas() {
  var atletas = [];
  page.database.ref(page.databaseRef).once('value').then(function(snapshot) {
    snapshot.forEach(function(atleta) {
      var tempAtleta = atleta.val();
      tempAtleta.uid = atleta.key;
      atletas.push(tempAtleta);
    });
    console.log(atletas);
  });
}



function preencheTabelaAtletas() {
  var atletas = getAtletas();
  linhasAtleta.innerHTML = "";
  var linhaNova;
  atletas.forEach(function(atleta) {
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
  // .
  // .
  // .
  editarAtleta(atleta);

}

function editarAtleta(atleta) {
  page.database.ref().update(atleta);
}

function excluirAtleta(atleta) {
  page.database.ref('atletas/' + atleta.id).remove();
}


// page.abreListaAtleta() {
//
// }
