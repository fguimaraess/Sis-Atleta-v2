var pageAtleta = {
    atletas: []
    , database: firebase.database()
    , databaseRef: '/atletas/'
    , linhasAtleta: document.querySelector('#linhas-atleta'), //VER C LUIZ
    templateLinha: document.querySelector('#template-linha'), //VER C LUIZ
    nomeField: document.querySelector('#nomeatleta-field')
    , idAtletaField: document.querySelector('#idAtleta')
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
    , addAtletaBtn: document.querySelector('#addAtletaBtn')
}

document.querySelector('#testeAtletaJS').addEventListener('click', function(){
    getAtletas();

});

function abreModalAtleta(idAtleta) {
    if (idAtleta) {
        atletaSel = pageAtleta.atletas[idAtleta]
        pageAtleta.idAtletaField.value = atletaSel.uid;
        pageAtleta.nomeField.value = atletaSel.nome;
        pageAtleta.sobrenomeField.value = atletaSel.sobrenome;
        $(pageAtleta.posicaoField).val(atletaSel.posicao);
        $(pageAtleta.posicaoField).material_select();
        pageAtleta.idadeField.value = atletaSel.idade;
        $(pageAtleta.categoriaField).val(atletaSel.categoria);
        $(pageAtleta.categoriaField).material_select();
        pageAtleta.clubeField.value = atletaSel.clube;
        pageAtleta.cidadeField.value = atletaSel.cidade;
        pageAtleta.paisField.value = atletaSel.pais;
    }
    else {
        pageAtleta.idAtletaField.value = null;
        pageAtleta.nomeField.value = null;
        pageAtleta.sobrenomeField.value = null;
        pageAtleta.posicaoField.value = null;
        $(pageAtleta.posicaoField).material_select();
        pageAtleta.idadeField.value = null;
        pageAtleta.categoriaField.value = null;
        $(pageAtleta.categoriaField).material_select();
        pageAtleta.clubeField.value = null;
        pageAtleta.cidadeField.value = null;
        pageAtleta.paisField.value = null;
    }
    $('#modal-addatleta').modal('open');
}
pageAtleta.addAtletaBtn.addEventListener('click', function () {
    abreModalAtleta(null);
})
pageAtleta.atletaBtn.addEventListener('click', function () {
    var tempAtleta = {
        nome: pageAtleta.nomeField.value
        , sobrenome: pageAtleta.sobrenomeField.value
        , posicao: pageAtleta.posicaoField.value
        , idade: pageAtleta.idadeField.value
        , categoria: pageAtleta.categoriaField.value
        , clube: pageAtleta.clubeField.value
        , cidade: pageAtleta.cidadeField.value
        , pais: pageAtleta.paisField.value
    }
    if (tempAtleta.nome == "" || tempAtleta.sobrenome == "" || tempAtleta.posicao == "" || tempAtleta.idade == "" || tempAtleta.categoria == "" || tempAtleta.cidade == "" || tempAtleta.pais == "") {
        swal("Ainda não...", "Preencha os dados do atleta.", "error");
    }
    else {
        if (pageAtleta.idAtletaField.value) {
            salvarAlteracoes(tempAtleta);
            $('#modal-addatleta').modal('close');
        }
        else {
            novoAtleta(tempAtleta);
            $('#modal-addatleta').modal('close');
        }
    }
})
window.addEventListener('load', getAtletas);
//pageAtleta.tableAtletas.addEventListener('click', getLinha);
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
    idAtleta = pageAtleta.idAtletaField.value;
    tempAtleta.nome = pageAtleta.nomeField.value;
    tempAtleta.sobrenome = pageAtleta.sobrenomeField.value;
    tempAtleta.posicao = pageAtleta.posicaoField.value;
    tempAtleta.idade = pageAtleta.idadeField.value;
    tempAtleta.categoria = pageAtleta.categoriaField.value;
    tempAtleta.clube = pageAtleta.clubeField.value;
    tempAtleta.cidade = pageAtleta.cidadeField.value;
    tempAtleta.pais = pageAtleta.paisField.value;
    pageAtleta.database.ref(pageAtleta.databaseRef + '/' + idAtleta).update(tempAtleta).then(swal("", "Atleta atualizado com sucesso", "success"));
    
    var jogadoresNaTela = document.querySelectorAll('.idDosAtletas');
    jogadoresNaTela.forEach(function(jogadorHtml){
        if(jogadorHtml.id == idAtleta){
            jogadorHtml.querySelector('.nomeJogadorTabela').innerHTML = tempAtleta.nome + " " + tempAtleta.sobrenome;
            jogadorHtml.querySelector('.posicaoJogadorTabela').innerHTML = tempAtleta.posicao;
            jogadorHtml.querySelector('.idadeJogadorTabela').innerHTML = tempAtleta.idade;
            jogadorHtml.querySelector('.clubeJogadorTabela').innerHTML = tempAtleta.clube;
        }
    });
    
}

function novoAtleta(atleta) {
    var idAtletaNovo = pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta)
    .then(function(atletaRef){
        atleta.uid = atletaRef.key;
        pageAtleta.atletas[atletaRef.key] = (atleta);
        preencheTabela(atleta);
    })
    .then(swal("", "Atleta criado com sucesso", "success"))
}

function excluirAtleta(idAtleta) {
    
    pageAtleta.database.ref(pageAtleta.databaseRef + idAtleta).remove()
        .then(pageAtleta.tableAtletas.querySelector('#' + idAtleta).innerHTML = '')
        .then(swal("", "Atleta removido com sucesso", "success"));
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

function preencheTabela(tempAtleta) {
   /* var jogadoresNaTela = document.querySelectorAll('.idDosAtletas');
    jogadoresNaTela.forEach(function(jogadorHtml){
        if(tempAtleta.uid == jogadorHtml.id){
            jogadorHtml
        }
    }); */
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    html += '<td class="nomeJogadorTabela">' + tempAtleta.nome + " " + tempAtleta.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '<td class="idadeJogadorTabela">' + tempAtleta.idade + '</td>';
    html += '<td class="clubeJogadorTabela">' + tempAtleta.clube + '</td>';
    html += '<td><a onclick="abreModalAtleta(\'' + tempAtleta.uid + '\')" href="#" class="editar-jogador"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirAtleta(\'' + tempAtleta.uid + '\' )" href="#" class="excluir-jogador"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>';
    $('#body-atleta').append(html);        
}
//NOK
function getAtletasByNome(nome) {
    var atletas = [];
    pageAtleta.database.ref(pageAtleta.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            if (nome == atletaRef.val().nome) {
                var tempAtleta = atletaRef.val();
                tempAtleta.uid = atletaRef.key;
                atletas.push(tempAtleta);
            }
        });
        console.log(atletas);
    });
}