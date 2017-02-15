var page = {
  database: firebase.database(),
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

function getAtletas() {
  page.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().forEach(function() {
      console.log(page.nomeAtleta);
    });
  })
}

function getAtletasById(idAtleta) {
  return page.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().idAtleta;
  })
}

function getAtletasByNome(nomeAtleta) {
  page.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().forEach(function(nomeAtleta) {

    });
  })
}

function novoAtleta() {
  page.database.ref('atletas/').push().set({
    nomeAtleta: "Felipe",
    sobrenomeAtleta: "Guimarães",
    posicao: "Atacante",
    idade: 24,
    categoria: "Profissional",
    clube: "",
    cidade: "São Gonçalo",
    pais: "Brasil",
    foto: "url('campo-futebol.jpg')"
  });
}

function editarAtleta( /*idAtleta*/ ) {
  var atleta = {
    nomeAtleta: "Marquinho",
    sobrenomeAtleta: "Calazans",
    posicao: "Atacante",
    idade: 20,
    categoria: "Profissional",
    clube: "",
    cidade: "São Gonçalo",
    pais: "Brasil",
    foto: "url('campo-futebol.jpg')"
  }
  var updates = {};
  updates['/atletas/' + /*idAtleta*/ ] = atleta;
  return page.database.ref().update(updates);
}

function excluirAtleta( /*idAtleta*/ ) {
  page.database.ref('atletas/' + /*idAtleta*/ ).remove();
}
page.atletaBtn.addEventListener('click', novo);
