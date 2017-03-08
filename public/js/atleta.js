var pageAtleta = {
    database: firebase.database()
    , databaseRef: '/atletas/'
    , linhasAtleta: document.querySelector('#linhas-atleta'), //VER C LUIZ
    templateLinha: document.querySelector('#template-linha'), //VER C LUIZ
    nomeField: document.querySelector('#nomeatleta-field')
    , sobrenomeField: document.querySelector('#sobrenomeatleta-field')
    , posicaoField: document.querySelector('#posicaoatleta-field')
    , idadeField: document.querySelector('#idadeatleta-field')
    , categoriaField: document.querySelector('#categoriaatleta-field')
    , clubeField: document.querySelector('#clubeatleta-field')
    , cidadeField: document.querySelector('#cidadeatleta-field')
    , paisField: document.querySelector('#paisatleta-field')
    , fotoField: document.querySelector('#fotoatleta-field')
    , atletaBtn: document.querySelector('#salvar-atleta-btn')
    , divAtletas: document.querySelector('#view-atletas')
    , tableAtletas: document.querySelector('#table-atletas')
    , modalEditBtn: document.querySelector('#modal-editatleta')
    , editNomeField: document.querySelector('#edit-nomeatleta-field')
    , editSobrenomeField: document.querySelector('#edit-sobrenomeatleta-field')
    , editPosicaoField: document.querySelector('#edit-posicaoatleta-field')
    , editIdadeField: document.querySelector('#edit-idadeatleta-field')
    , editCategoriaField: document.querySelector('#edit-categoriaatleta-field')
    , editClubeField: document.querySelector('#edit-clubeatleta-field')
    , editCidadeField: document.querySelector('#edit-cidadeatleta-field')
    , editPaisField: document.querySelector('#edit-paisatleta-field')
    , editFotoField: document.querySelector('#edit-fotoatleta-field')
    , editatletaBtn: document.querySelector('#edit-atleta-btn')
    , salvarEdicaoBtn: document.querySelector('#editar-atleta-btn')
    , uploader: document.querySelector('#uploader')
    , fileButton: document.querySelector('#fileButton')
    , btnCarregarFoto: document.querySelector('#btn-foto')
}
window.addEventListener('load', getAtletas);


pageAtleta.atletaBtn.addEventListener('click', criaAtleta);
pageAtleta.tableAtletas.addEventListener('click', getLinha);
//pageAtleta.editatletaBtn.addEventListener('click', abreModal);
//pageAtleta.salvarEdicaoBtn.addEventListener('click', getLinha);

pageAtleta.fileButton.addEventListener('change', function (e) {
    //Pega o arquivo
    var file = e.target.files[0];
    //Referencia Storage
    var storageRef = firebase.storage().ref('atletas/' + file.name);
    //Enviar
    var task = storageRef.put(file);
    //Atualiza progress bar
    task.on('state_changed', function progress(snapshot) {
        var porcentagem = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        pageAtleta.uploader = porcentagem;
    }, function error(err) {
        console.log(err);
    }, function complete() {
        swal('Sucesso!', "Foto carregada com sucesso", "success");
    })
});

function salvarAlteracoes(tempAtleta) {
    tempAtleta.nome = pageAtleta.editNomeField.value;
    tempAtleta.sobrenome = pageAtleta.editSobrenomeField.value;
    tempAtleta.posicao = pageAtleta.editPosicaoField.value;
    tempAtleta.idade = pageAtleta.editIdadeField.value;
    tempAtleta.categoria = pageAtleta.editCategoriaField.value;
    tempAtleta.clube = pageAtleta.editClubeField.value;
    tempAtleta.cidade = pageAtleta.editCidadeField.value;
    tempAtleta.pais = pageAtleta.editPaisField.value;
    tempAtleta.foto = file;
    pageAtleta.database.ref(pageAtleta.databaseRef + '/' + tempAtleta.uid).update(tempAtleta);
}

function abreModal(idLinha) {
    var atletas = [];
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            atletas.push(tempAtleta); //Cria um novo objeto na árvore Firebase
            if (idLinha == tempAtleta.uid) {
                pageAtleta.editNomeField.value = tempAtleta.nome;
                pageAtleta.editSobrenomeField.value = tempAtleta.sobrenome;
                pageAtleta.editPosicaoField.value = tempAtleta.posicao;
                pageAtleta.editIdadeField.value = tempAtleta.idade;
                pageAtleta.editCategoriaField.value = tempAtleta.categoria;
                pageAtleta.editClubeField.value = tempAtleta.clube;
                pageAtleta.editCidadeField.value = tempAtleta.cidade;
                pageAtleta.editPaisField.value = tempAtleta.pais;
                pageAtleta.editFotoField.value = tempAtleta.foto;
                salvarAlteracoes(tempAtleta);
            }
        });
    });
}

//$(document).ready(function () {
//
//         document.querySelector('.jogador').addEventListener('click', function () {
//        console.log(document.querySelector('.jogador'));
//                     this.parent().parent().uid;
//    });
//    });

//GetLinha + Criar Linha + GetAtletas
function getLinha() {
    $('#table-atletas a').on('click', function(){
        var idLinha = $(this).closest('tr').attr('id');
        console.log(idLinha);
        return idLinha;
    });
}

function preencheTabela(tempAtleta) //Funciona sem DataTable
{
    var html = '';
    html += '<tr id="' + tempAtleta.uid + '">';
    //html += '<td hidden>' + tempAtleta.uid + '</td>';
    html += '<td><a href="#">' + tempAtleta.nome + '</a></td>';
    html += '<td>' + tempAtleta.posicao + '</td>';
    html += '<td>' + tempAtleta.idade + '</td>';
    html += '<td>' + tempAtleta.clube + '</td>';
    html += '<td><a href="#modal-addatleta" id="btn-editar-atleta"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a href="#" id="btn-excluir-atleta"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>';
    $('#body-atleta').append(html);
}

function getAtletas() {
    atletas = [];
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            atletas.push(tempAtleta);
            preencheTabela(tempAtleta);
        });
    })
}


//Criar Atleta
function novoAtleta(atleta) {
    pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta).then(function () {
        swal({
            title: "Atleta cadastrado com sucesso!"
            , text: "O atleta " + pageAtleta.nomeField.value + " foi adicionado."
            , type: "success"
            , timer: 50000
            , showConfirmButton: true
        }, function () {
            window.location.reload()
        });
    }).catch(function (error) {
        swal("Erro...", "O atleta " + pageAtleta.nomeField.value + " não foi adicionado.", "error");
    });
}
//OK
function criaAtleta() {
    $('#modal-addatleta').modal('open');
    var atleta = {
            nome: pageAtleta.nomeField.value
            , sobrenome: pageAtleta.sobrenomeField.value
            , posicao: pageAtleta.posicaoField.value
            , idade: pageAtleta.idadeField.value
            , categoria: pageAtleta.categoriaField.value
            , clube: pageAtleta.clubeField.value
            , cidade: pageAtleta.cidadeField.value
            , pais: pageAtleta.paisField.value
            , foto: pageAtleta.fotoField.value
        }
        //Obrigatoriedade dos campos
    if (atleta.nome == "" || atleta.sobrenome == "" || atleta.posicao == "" || atleta.idade == "" || atleta.categoria == "" || atleta.cidade == "" || atleta.pais == "") {
        swal("Ainda não...", "Preencha os dados do atleta.", "error");
    }
    else {
        novoAtleta(atleta);
    }
}
//OK
function getAtletasByNome(mozao) {
    var atletas = [];
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
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


//Utilizando DataTable
//function preencheTabelaAtletas(atleta) {
//    var table = $(pageAtleta.tableAtletas).DataTable();
//    table.row.add(
//        [
//            atleta.uid
//            , atleta.nome
//            , atleta.posicao
//            , atleta.idade
//            , atleta.clube
//            , ""
//        ]).draw();
//    table.column(0).visible(false);
//}
// pageAtleta.abreListaAtleta() {
//
// }
//Inicializar Tabela + getLinhas **Exclui o doc.ready do datatable e scriptsrc no dashboard.html
//$(document).ready(function () {
//    var table = $('#table-atletas').DataTable({
//        "language": {
//            "url": "../data/PT.json"
//        }
//        , "paging": true
//        , "ordering": true
//        , "info": true
//        , "searching": true
//        , select: true
//        , "columnDefs": [{
//            "data": null
//            , "targets": -1
//            , "defaultContent": '<a href=# class="btm-floating waves-effect waves-light lightseagreen" id="btn-editar-atleta"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a href=# class="btm-floating waves-effect waves-light lightseagreen" id="btn-excluir-atleta"><i class="material-icons"><i class="material-icons">remove_circle</i>'
//        }]
//    });
//});