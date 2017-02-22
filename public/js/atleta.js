var pageAtleta = {
  database: firebase.database(),
  databaseRef: '/atletas/',
  linhasAtleta: document.querySelector('#linhas-atleta'), //VER C LUIZ
  templateLinha: document.querySelector('#template-linha'), //VER C LUIZ
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
  divAtletas: document.querySelector('#view-atletas'),
  tableAtletas: document.querySelector('#table-atletas')
}
window.addEventListener('load', getAtletas);
pageAtleta.atletaBtn.addEventListener('click', criaAtleta);

function getAtletas(){
    atletas = [];
pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function(snapshot){
    snapshot.forEach(function (atletaRef){
        var tempAtleta = atletaRef.val();
        tempAtleta.uid = atletaRef.key;
        atletas.push(tempAtleta);
        preencheTabelaAtletas(tempAtleta);    
});
});
}

function preencheTabelaAtletas(atleta) {
var table = $(pageAtleta.tableAtletas).DataTable();
        table.row.add(
        [
            atleta.uid,
            atleta.nome,
            atleta.posicao,
            atleta.idade,
            atleta.clube,
        ]).draw();
table.column(0).visible(false);
}


function novoAtleta(atleta) {
  pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta).then(function(){
      swal({
            title: "Atleta cadastrado com sucesso!"
            , text: "O atleta " +pageAtleta.nomeField.value + " foi adicionado."
            , type: "success"
            , timer: 50000
            , showConfirmButton: true
        }, function () {
      window.location.reload()});
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


//Inicializar Tabela + getLinhas
$(document).ready(function() {
    var table = $('#table-atletas').DataTable({
        "language": {
            "url": "../data/PT.json"
        },
        "paging":   true,
        "ordering": true,
        "info":     true,
        "searching": true
    },
      $('#table-atletas tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        alert( 'You clicked on '+data[1]+'\'s row' );
    })
    )});

//function criarLinha(atleta) -- Funciona sem DataTable
//{
    //      var html = '';
//      html += '<tr id="linhas-atleta">';
//      html += '<td hidden>'+tempAtleta.uid+'</td>';
//      html += '<td>'+tempAtleta.nome+'</td>';
//      html += '<td>'+tempAtleta.posicao+'</td>';
//      html += '<td>'+tempAtleta.idade+'</td>';
//      html += '<td>'+tempAtleta.clube+'</td>';
//      html += '</tr>';

//      $('#body-atleta').append(html);
//}