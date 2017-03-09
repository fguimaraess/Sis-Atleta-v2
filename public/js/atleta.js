var pageAtleta = {
    atletas: [],
    database: firebase.database()
    , databaseRef: '/atletas/'
    , linhasAtleta: document.querySelector('#linhas-atleta'), //VER C LUIZ
    templateLinha: document.querySelector('#template-linha'), //VER C LUIZ
    nomeField: document.querySelector('#nomeatleta-field'),
    idAtletaField: document.querySelector('#idAtleta')
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
    , uploader: document.querySelector('#uploader')
    , fileButton: document.querySelector('#fileButton')
    , btnCarregarFoto: document.querySelector('#btn-foto')
    , btnEditarAtleta: document.querySelector('#btn-editar-atleta')
}





function getAtletas() {
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            pageAtleta.atletas[atletaRef.key] = (tempAtleta);
            preencheTabela(tempAtleta);
        });
    })
}

function novoAtleta(atleta) {
  pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta).then(swal("", "Atleta criado com sucesso", "success"));
}

function abreModalAtleta(idAtleta){
  console.log();
  atletaSel = pageAtleta.atletas[idAtleta]
  pageAtleta.idAtletaField.value = atletaSel.uid;
  pageAtleta.nomeField.value = atletaSel.nome;
  pageAtleta.sobrenomeField.value = atletaSel.sobrenome;
  pageAtleta.posicaoField.value = atletaSel.posicao;
  pageAtleta.idadeField.value = atletaSel.idade;
  pageAtleta.categoriaField.value;
  pageAtleta.clubeField.value;
  pageAtleta.cidadeField.value;
  pageAtleta.paisField.value;
  $('#modal-addatleta').modal('open');
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
    tempAtleta.nome = pageAtleta.nomeField.value;
    tempAtleta.sobrenome = pageAtleta.sobrenomeField.value;
    tempAtleta.posicao = pageAtleta.posicaoField.value;
    tempAtleta.idade = pageAtleta.idadeField.value;
    tempAtleta.categoria = pageAtleta.categoriaField.value;
    tempAtleta.clube = pageAtleta.clubeField.value;
    tempAtleta.cidade = pageAtleta.cidadeField.value;
    tempAtleta.pais = pageAtleta.paisField.value;
    //tempAtleta.foto = file;
    pageAtleta.database.ref(pageAtleta.databaseRef + '/' + tempAtleta.uid).update(tempAtleta);
}

function modalEdit(idLinha) {
    var atletas = [];
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            atletas.push(tempAtleta); //Cria um novo objeto na árvore Firebase
            if (idLinha == tempAtleta.uid) {
                pageAtleta.nomeField.value = tempAtleta.nome;
                pageAtleta.sobrenomeField.value = tempAtleta.sobrenome;
                pageAtleta.posicaoField.value = tempAtleta.posicao;
                pageAtleta.idadeField.value = tempAtleta.idade;
                pageAtleta.categoriaField.value = tempAtleta.categoria;
                pageAtleta.clubeField.value = tempAtleta.clube;
                pageAtleta.cidadeField.value = tempAtleta.cidade;
                pageAtleta.paisField.value = tempAtleta.pais;
                //pageAtleta.fotoField.value = tempAtleta.foto;
                if (tempAtleta.uid == "") {
                    novoAtleta(tempAtleta);
                }
                else {
                    salvarAlteracoes(tempAtleta);
                }
            }
        });
    });
}
//GetLinha + Criar Linha + GetAtletas
function getLinha() {
    $('#table-atletas a').on('click', function () {
        var idLinha = $(this).closest('tr').attr('id');
        console.log(idLinha);
        modalEdit(idLinha);
    });
}

function preencheTabela(tempAtleta)
{
    var html = '';
    html += '<tr id="' + tempAtleta.uid + '">';
    html += '<td><a href="#">' + tempAtleta.nome + '</a></td>';
    html += '<td>' + tempAtleta.posicao + '</td>';
    html += '<td>' + tempAtleta.idade + '</td>';
    html += '<td>' + tempAtleta.clube + '</td>';
    html += '<td><a onclick="abreModalAtleta(\''+ tempAtleta.uid +'\')" href="#" class="editar-jogador"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a href="#" id="btn-excluir-atleta"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>';
    $('#body-atleta').append(html);

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
                //            , foto: pageAtleta.fotoField.value
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

function excluirAtleta(atleta) {
    pageAtleta.database.ref('atletas/' + atleta.id).remove();
}
