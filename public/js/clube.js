var pageClube = {
    clubes: []
    , atletas: []
    , database: firebase.database()
    , databaseRef: '/clubes/'
    , databaseAtletas: '/atletas/'
    , nomeClubeField: document.querySelector('#nome-clube-field')
    , siglaClubeField: document.querySelector('#sigla-clube-field')
    , idClubeField: document.querySelector('#idClube')
    , clubeBtn: document.querySelector('#salvar-clube-btn')
    , addClubeBtn: document.querySelector('#addClubeBtn')
    , tableClubes: document.querySelector('#table-clubes')
    , bodyAtletasClube: document.querySelector('#body-atletas-clube')
    , clubesSideBtn: document.querySelector('#clubes-menu')
    , buscaClubeBtn: document.querySelector('#busca-clube-btn')
    , buscaClubeField: document.querySelector('#busca-clube-field')
    , apagarBuscaClube: document.querySelector('#apagar-busca-clube-btn')
}
window.addEventListener('load', getClubes);
pageClube.clubesSideBtn.addEventListener('click', function(){
    getClubes();
    pageClube.buscaClubeField.value = "";
});
pageClube.buscaClubeBtn.addEventListener('click', function(){
    getClubessPorNome(pageClube.buscaClubeField.value);
});
pageClube.apagarBuscaClube.addEventListener('click', function(){
    pageClube.buscaClubeField.value = "";
    getClubessPorNome(pageClube.buscaClubeField.value);
})

function abreModalClube(idClube) {
    if (idClube) {
        clubeSel = pageClube.clubes[idClube]
        pageClube.idClubeField.value = clubeSel.uid;
        pageClube.nomeClubeField.value = clubeSel.nomeclube;
        pageClube.siglaClubeField.value = clubeSel.siglaclube;
    }
    else {
        pageClube.idClubeField.value = null;
        pageClube.nomeClubeField.value = null;
        pageClube.siglaClubeField.value = null;
    }
    $('#modal-addclube').modal('open');
}
pageClube.addClubeBtn.addEventListener('click', function () {
    abreModalClube(null);
})
pageClube.clubeBtn.addEventListener('click', function () {
    var tempClube = {
        nomeclube: pageClube.nomeClubeField.value
        , siglaclube: pageClube.siglaClubeField.value
    }
    if (tempClube.nomeclube == "" || tempClube.siglaclube == "") {
        swal("Aviso!", "O nome e a sigla devem ser preenchidos!");
    }
    else {
        if (pageClube.idClubeField.value) {
            salvarAlteracoesClube(tempClube);
            $('#modal-addclube').modal('close');
        }
        else {
            novoClube(tempClube);
            $('#modal-addclube').modal('close');
        }
    }
})

function salvarAlteracoesClube(tempClube) {
    idClube = pageClube.idClubeField.value;
    tempClube.nomeclube = pageClube.nomeClubeField.value;
    tempClube.siglaclube = pageClube.siglaClubeField.value;
    pageClube.database.ref(pageClube.databaseRef + '/' + pageClube.idClubeField.value).update(tempClube).then(swal("", "Clube atualizado com sucesso", "success"));
    var clubesNaTela = document.querySelectorAll('.idDosClubes');
    clubesNaTela.forEach(function (clubeHtml) {
        if (clubeHtml.id == idClube) {
            clubeHtml.querySelector('.nomeClubeTabela').innerHTML = pageClube.nomeClubeField.value;
            clubeHtml.querySelector('.siglaClubeTabela').innerHTML = pageClube.siglaClubeField.value;
        }
    })
}

function novoClube(clube) {
    var idClubeNovo = pageClube.database.ref(pageClube.databaseRef).push(clube).then(function (clubeRef) {
        clube.uid = clubeRef.key;
        pageClube.clubes[clubeRef.key] = (clube);
        preencheTabelaClube(clube);
    }).then(swal("", "Clube criado com sucesso", "success"));
}

function excluirClube(idClube) {
    pageClube.database.ref(pageClube.databaseRef + idClube).remove().then(swal("", "Clube removido com sucesso", "success"));
    pageClube.tableClubes.querySelector('#' + idClube).innerHTML = '';
}

function preencheTabelaClube(tempClube) {
    var html = '';
    html += '<tr class="idDosClubes" id="' + tempClube.uid + '">';
    html += '<td class="nomeClubeTabela">' + tempClube.nomeclube + '</a></td>';
    html += '<td class="siglaClubeTabela">' + tempClube.siglaclube + '</td>';
    html += '<td><a onclick="getAtletasByClube(\'' + tempClube.uid + '\')" href="#" class=ver-atletas>Ver Atletas</a></td>';
    html += '<td><a onclick="abreModalClube(\'' + tempClube.uid + '\')" href="#" class="editar-clube"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirClube(\'' + tempClube.uid + '\' )" href="#" class="excluir-clube"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>';
    $('#body-clube').append(html);
}

function getClubes() {
    limparTabela();
    pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            pageClube.clubes[clubeRef.key] = (tempClube);
            preencheTabelaClube(tempClube);
        });
    })
}

function getAtletasByClube(idClube) {
    $('#modal-veratletas').modal('open');
    var atletasClube = document.querySelectorAll('.idDosAtletasClube');
    atletasClube.forEach(function (atletaClubeHtml) {
        pageClube.bodyAtletasClube.innerHTML = '';
    })
    pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            if (idClube == tempClube.uid) {
                //console.log(tempClube.nomeclube);
                pageClube.database.ref(pageClube.databaseAtletas).once('value').then(function (snapshot) {
                    snapshot.forEach(function (atletaRef) {
                        var tempAtletaClube = atletaRef.val();
                        if (tempClube.uid == tempAtletaClube.clube) {
                            if (tempAtletaClube.foto) {
                                var htmlFoto = '<img width="32" height="32" src="' + tempAtletaClube.foto + '"/>';
                            }
                            else {
                                var htmlFoto = '<img width="32" height="32" src="img/mini_sem_foto.png"/>';
                            }
                            html = '';
                            html += '<tr class="idDosAtletasClube" id="' + tempAtletaClube.uid + '">';
                            html += '<td>' + htmlFoto + '</td>';
                            html += '<td>' + tempAtletaClube.nome + '</td>';
                            html += '<td>' + tempAtletaClube.idade + '</td>';
                            html += '<td>' + tempAtletaClube.posicao + '</td>';
                            html += '<td>' + tempAtletaClube.categoria + '</td>';
                            html += '</tr>';
                            $('#body-atletas-clube').append(html);
                        }
                    });
                });
            }
        });
    });
}

    function getClubesAtt() {
        pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
            snapshot.forEach(function (clubeRef) {
                var tempClube = clubeRef.val();
                tempClube.uid = clubeRef.key;
                pageClube.clubes[clubeRef.key] = (tempClube);
            });
        })
}

function getClubessPorNome(nomeClube){
    limparTabela();    
    for(var key in pageClube.clubes){
        var str = pageClube.clubes[key];
        var strNome = str.nomeclube.toLowerCase();
        var strUid = str.uid;
        if(strNome.search(nomeClube.toLowerCase()) != -1){
            clubeSel = pageClube.clubes[strUid];
            preencheTabelaClube(clubeSel);
        }
    }
}

function limparTabela(){
    var clubesNaTela = document.querySelectorAll('.idDosClubes');
    clubesNaTela.forEach(function () {
        pageClube.tableClubes.querySelector('#body-clube').innerHTML = '';
    });
}