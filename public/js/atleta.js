var pageAtleta = {
  database: firebase.database(),
  databaseRef: '/atletas/',
  linhasAtleta: 'a', //VER C LUIZ
  templateLinha: 'b', //VER C LUIZ
  nomeField: document.querySelector('#nomeatleta-field'),
  sobrenomeField: document.querySelector('#sobrenomeatleta-field'),
  posicaoField: document.querySelector('#posicaoatleta-field'),
  idadeField: document.querySelector('#idadeatleta-field'),
  categoriaField: document.querySelector('#categoriaatleta-field'),
  clubeField: document.querySelector('#clubeatleta-field'),
  cidadeField: document.querySelector('#cidadeatleta-field'),
  paisField: document.querySelector('#paisatleta-field'),
  fotoField: document.querySelector('#fotoatleta-field'),
  atletaBtn: document.querySelector('#salvar-atleta-btn'),
  atletasSideBtn: document.querySelector('#atletas-menu'),
  divAtletas: document.querySelector('#view-atletas'),
  relatoriosSideBtn: document.querySelector('#relatorios-menu')
}


pageAtleta.relatoriosSideBtn.addEventListener('click', function(){
  swal("Ops...", "Menu de Relatórios em desenvolvimento");
})

function novoAtleta(atleta) {
  pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta).then(function(){
      swal("Atleta cadastrado com sucesso!", "O atleta " +pageAtleta.nomeField.value + " foi adicionado.", "success");
      $('#modal-addatleta').modal('close');
  }).catch(function(error){
           swal("Erro...", "O atleta " +pageAtleta.nomeField.value + " não foi adicionado.", "error");
           });
}
//OK
function criaAtleta() {
  var atleta = {
    nome: pageAtleta.nomeField.value,
    sobrenome: pageAtleta.sobrenomeField.value,
    posicao: pageAtleta.posicaoField.value,
    idade: pageAtleta.idadeField.value,
    categoria: pageAtleta.categoriaField.value,
    clube: pageAtleta.clubeField.value,
    cidade: pageAtleta.cidadeField.value,
    pais: pageAtleta.paisField.value,
    foto: pageAtleta.fotoField.value
  }
  //Obrigatoriedade dos campos
  if(atleta.nome == "" || atleta.sobrenome == "" || atleta.posicao == "" || atleta.idade == "" || atleta.categoria == "" || atleta.cidade == "" || atleta.pais == "")
  { 
   swal("Ainda não...", "Preencha os dados do atleta.", "error");
  }else{
  novoAtleta(atleta);
  }
}
pageAtleta.atletaBtn.addEventListener('click', criaAtleta);
//OK
function getAtletasByNome(mozao) {
  var atletas = [];
  pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function(snapshot) {
    snapshot.forEach(function(atletaRef) {
      if (mozao.nome == atletaRef.val().nome) {
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
  pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function(snapshot) {
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
  pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(atleta) {
      var idAtleta = 1 //gambiarra pra pegar o id
      atleta.id = idAtleta;
      atletas.push(atleta);
    });
    return atletas;
  });
}

function getAtletasById(idAtleta) {
  return pageAtleta.database.ref('/atletas/').once('value').then(function(snapshot) {
    snapshot.val().idAtleta;
  })
}

function salvaModal() {
  var atleta = {
    nome: pageAtleta.nomeField.textContent,
    sobrenome: pageAtleta.sobrenomeField.textContent
  };
  novoAtleta(atleta);
}

function salvaAlteracoes(atleta) {
  atleta.nome = pageAtleta.nomeField.textContent;
  atleta.sobrenome = pageAtleta.sobrenomeField.textContent;
  // .
  // .
  // .
  editarAtleta(atleta);
}

function editarAtleta(atleta) {
  pageAtleta.database.ref().update(atleta);
}

function excluirAtleta(atleta) {
  pageAtleta.database.ref('atletas/' + atleta.id).remove();
}
// pageAtleta.abreListaAtleta() {
//
// }
