var page = {
    database:firebase.database(),
    dataRef: "/jogos/",
    atletaBtn: document.querySelector('#novo-atleta'),
    nomeField: "Felipe",
  sobrenomeField: "Guimarães",
  posicaoField: "Atacante",
  idadeField: 24,
  categoriaField: "Profissional",
  clubeField: "",
  cidadeField: "São Gonçalo",
  paisField: "Brasil",
  fotoField: "url('campo-futebol.jpg')"
}


page.atletaBtn.addEventListener('click', getAtletas)

function novoAtleta(atleta){
    page.database.ref('/atletas/' + atleta.atletaId).set(atleta);
    
}

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

function getAtletasByNome(atleta) {
  page.database.ref('atletas/' + atleta.atletaId).once('value').then(function(snapshot) {
    snapshot.forEach(function(atleta) {
      console.log(atleta.val());
    });
  });
}

