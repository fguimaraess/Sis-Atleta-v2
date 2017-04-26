var pageAtleta = {
    atletas: [],
    database: firebase.database(),
    databaseRef: '/atletas/',
    dataBaseClube: '/clubes/',
    nomeField: document.querySelector('#nomeatleta-field'),
    idAtletaField: document.querySelector('#idAtleta'),
    apelidoField: document.querySelector('#apelidoatleta-field'),
    posicaoField: document.querySelector('#posicaoatleta-field'),
    idadeField: document.querySelector('#idadeatleta-field'),
    categoriaField: document.querySelector('#categoriaatleta-field'),
    clubeField: document.querySelector('#clubeatleta-field'),
    cidadeField: document.querySelector('#cidadeatleta-field'),
    paisField: document.querySelector('#paisatleta-field'),
    fotoField: document.querySelector('#fotoatleta-field'),
    atletaBtn: document.querySelector('#salvar-atleta-btn'),
    divAtletas: document.querySelector('#view-atletas'),
    tableAtletas: document.querySelector('#table-atletas'),
    uploader: document.querySelector('#uploader'),
    fileButton: document.querySelector('#fileButton'),
    btnCarregarFoto: document.querySelector('#btn-foto'),
    btnEditarAtleta: document.querySelector('#btn-editar-atleta'),
    addAtletaBtn: document.querySelector('#addAtletaBtn'),
    bodyAtleta: document.querySelector('#body-atleta'),
    atletasSideBtn: document.querySelector('#atletas-menu'),
    mostraFoto: document.querySelector('#mostra-foto'),
    carregarFoto: document.querySelector('#btnCarregar'),
    caminhoFoto: document.querySelector('#file-path')
}
//window.addEventListener('load', getClubes);
pageAtleta.atletasSideBtn.addEventListener('click', function () {
    getClubesAtt();
    getAtletas();
});




function getClubes(idAtleta) {
    atletaSel = pageAtleta.atletas[idAtleta];
    $(pageAtleta.clubeField).empty();
    
    var tempClube = [];
    if (idAtleta) {
        tempClube = pageClube.clubes;
        for (var key in tempClube) {
            preencheCombo(tempClube[key]);
        }
    } else {
        tempClube = pageClube.clubes;
        for (var key in tempClube) {
            preencheCombo(tempClube[key]);
        }
        
    }
}

function preencheCombo(tempClube) {
    var newOption = document.createElement("option");
    newOption.value = tempClube.uid;
    newOption.innerHTML = tempClube.nomeclube;
    pageAtleta.clubeField.options.add(newOption);

    $(pageAtleta.clubeField).material_select();

}

function abreModalAtleta(idAtleta) {
    getClubes(idAtleta);
    if (idAtleta) {
        atletaSel = pageAtleta.atletas[idAtleta]
        if(atletaSel.foto)
        {
            pageAtleta.mostraFoto.innerHTML = '<input width="130" height="130" type="image" src="'+atletaSel.foto+'">';
        } else {
            pageAtleta.mostraFoto.innerHTML = '<input width="130" height="130" type="image" src="img/sem_foto.png">';
        }
            pageAtleta.idAtletaField.value = atletaSel.uid;
            pageAtleta.nomeField.value = atletaSel.nome;
            pageAtleta.apelidoField.value = atletaSel.apelido;
            $(pageAtleta.posicaoField).val(atletaSel.posicao);
            $(pageAtleta.posicaoField).material_select();
            pageAtleta.idadeField.value = atletaSel.idade;
            $(pageAtleta.categoriaField).val(atletaSel.categoria);
            $(pageAtleta.categoriaField).material_select();
            $(pageAtleta.clubeField).val(atletaSel.clube);
            $(pageAtleta.clubeField).material_select();
            pageAtleta.cidadeField.value = atletaSel.cidade;
            pageAtleta.paisField.value = atletaSel.pais;
            pageAtleta.fotoField = atletaSel.foto;
            pageAtleta.uploader.value = 0;
            pageAtleta.caminhoFoto.value = '';
    } else {
        pageAtleta.idAtletaField.value = null;
        pageAtleta.nomeField.value = null;
        pageAtleta.apelidoField.value = null;
        pageAtleta.posicaoField.value = null;
        $(pageAtleta.posicaoField).material_select();
        pageAtleta.idadeField.value = null;
        pageAtleta.categoriaField.value = null;
        $(pageAtleta.categoriaField).material_select();
        pageAtleta.clubeField.value = null;
        $(pageAtleta.clubeField).material_select();
        pageAtleta.cidadeField.value = null;
        pageAtleta.paisField.value = null;
        pageAtleta.fotoField = null;
        pageAtleta.uploader.value = 0;
        pageAtleta.mostraFoto.innerHTML = '<input width="130" height="130" type="image" src="img/sem_foto.png">';
        pageAtleta.caminhoFoto.value = '';
    }
    $('#modal-addatleta').modal('open');
}
pageAtleta.addAtletaBtn.addEventListener('click', function () {
    abreModalAtleta(null);
})
pageAtleta.atletaBtn.addEventListener('click', function () {
    var tempAtleta = {
        nome: pageAtleta.nomeField.value,
        apelido: pageAtleta.apelidoField.value,
        posicao: pageAtleta.posicaoField.value,
        idade: pageAtleta.idadeField.value,
        categoria: pageAtleta.categoriaField.value,
        clube: pageAtleta.clubeField.value,
        cidade: pageAtleta.cidadeField.value,
        pais: pageAtleta.paisField.value,
        foto: pageAtleta.fotoField
    }
    if (tempAtleta.nome == "" || tempAtleta.apelido == "" || tempAtleta.posicao == "" || tempAtleta.idade == "" || tempAtleta.categoria == "" || tempAtleta.cidade == "" || tempAtleta.pais == "") {
        swal("Ainda não...", "Preencha os dados do atleta.", "error");
    } else {
        if (pageAtleta.idAtletaField.value) {
            salvarAlteracoes(tempAtleta);
            $('#modal-addatleta').modal('close');
        } else {
            novoAtleta(tempAtleta);
            $('#modal-addatleta').modal('close');
        }
    }
})
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
        pageAtleta.uploader.value = porcentagem;
        if(porcentagem == 100){
            swal('Sucesso!', "", "success");
        }
    }, function error(err) {
        console.log(err);
    }, function complete() {
        pageAtleta.carregarFoto.addEventListener('click', function(){
            swal('Sucesso!', "Foto adiciona ao atleta", "success");
            var fotoTempAtleta = task.snapshot.downloadURL;
            pageAtleta.mostraFoto.innerHTML = '<input width="130" height="130" type="image" src="'+fotoTempAtleta+'">';
            atletaSelecionado = pageAtleta.atletas[pageAtleta.idAtletaField.value]
            if(atletaSelecionado){
                atletaSelecionado.foto = fotoTempAtleta;
            }
            pageAtleta.fotoField = fotoTempAtleta;
            })}) 
    })
        
        
        
    

function salvarAlteracoes(tempAtleta) {
    idAtleta = pageAtleta.idAtletaField.value;
    tempAtleta.nome = pageAtleta.nomeField.value;
    tempAtleta.apelido = pageAtleta.apelidoField.value;
    tempAtleta.posicao = pageAtleta.posicaoField.value;
    tempAtleta.idade = pageAtleta.idadeField.value;
    tempAtleta.categoria = pageAtleta.categoriaField.value;
    tempAtleta.clube = pageAtleta.clubeField.value;
    tempAtleta.cidade = pageAtleta.cidadeField.value;
    tempAtleta.pais = pageAtleta.paisField.value;
    if(tempAtleta.foto){
        tempAtleta.foto = pageAtleta.fotoField;
    } else {
        tempAtleta.foto = null;
    }
    pageAtleta.database.ref(pageAtleta.databaseRef + '/' + idAtleta).update(tempAtleta).then(swal("", "Atleta atualizado com sucesso", "success"));
    var jogadoresNaTela = document.querySelectorAll('.idDosAtletas');
    jogadoresNaTela.forEach(function (jogadorHtml) {
        if (jogadorHtml.id == idAtleta) {
            jogadorHtml.querySelector('.nomeJogadorTabela').innerHTML = tempAtleta.nome;
            jogadorHtml.querySelector('.apelidoJogadorTabela').innerHTML = tempAtleta.apelido;
            jogadorHtml.querySelector('.posicaoJogadorTabela').innerHTML = tempAtleta.posicao;
            jogadorHtml.querySelector('.idadeJogadorTabela').innerHTML = tempAtleta.idade;
            jogadorHtml.querySelector('.clubeJogadorTabela').innerHTML = pageClube.clubes[tempAtleta.clube].nomeclube;
            if(pageAtleta.fotoField)
            {
                jogadorHtml.querySelector('.fotoJogadorTabela').innerHTML = '<input width="32" height="32" type="image" src="'+tempAtleta.foto+'">';
            } else {
                jogadorHtml.querySelector('.fotoJogadorTabela').innerHTML = '<input width="32" height="32" type="image" src="img/mini_sem_foto.png">';
            }
        }
    });
}

function novoAtleta(atleta) {
    var idAtletaNovo = pageAtleta.database.ref(pageAtleta.databaseRef).push(atleta).then(function (atletaRef) {
        atleta.uid = atletaRef.key;
        pageAtleta.atletas[atletaRef.key] = (atleta);
        preencheTabela(atleta);
    }).then(swal("", "Atleta criado com sucesso", "success"))
}

function excluirAtleta(idAtleta) {
    pageAtleta.database.ref(pageAtleta.databaseRef + idAtleta).remove().then(pageAtleta.tableAtletas.querySelector('#' + idAtleta).innerHTML = '').then(swal("", "Atleta removido com sucesso", "success"));
}

function getAtletas() {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function () {
        pageAtleta.tableAtletas.querySelector('#body-atleta').innerHTML = '';
    })
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
    if(tempAtleta.foto)
    {
        var htmlFoto = '<img width="32" height="32" src="'+tempAtleta.foto+'"/>';
        
    } else {
        var htmlFoto = '<img width="32" height="32" src="img/mini_sem_foto.png"/>';
    }
    var htmlAtleta = '';
    htmlAtleta += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    htmlAtleta += '<td class="fotoJogadorTabela">'+htmlFoto+'</td>';
    htmlAtleta += '<td class="nomeJogadorTabela">' + tempAtleta.nome + '</td>';
    htmlAtleta += '<td class="apelidoJogadorTabela">'+tempAtleta.apelido+'</td>';
    htmlAtleta += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    htmlAtleta += '<td class="idadeJogadorTabela">' + tempAtleta.idade + '</td>';
    htmlAtleta += '<td class="clubeJogadorTabela">' + pageClube.clubes[tempAtleta.clube].nomeclube + '</td>';
    htmlAtleta += '<td><a onclick="abreModalAtleta(\'' + tempAtleta.uid + '\')" href="#" class="editar-jogador"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirAtleta(\'' + tempAtleta.uid + '\' )" href="#" class="excluir-jogador"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    htmlAtleta += '</tr>';
    $('#body-atleta').append(htmlAtleta);
}