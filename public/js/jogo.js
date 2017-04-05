var pageJogo = {
    atletas: []
    , clubes: []
    , database: firebase.database()
    , databaseRef: '/jogos/'
    , addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn')
    , addJogoBtn: document.querySelector('#addJogoBtn')
    , databaseAtletas: '/atletas/'
    , databaseClubes: '/clubes/'
    , tableAtletasCard: document.querySelector('#table-card-jogo')
    , tableAtletasAdicionados: document.querySelector('#table-card-atletas-jogo')
    , clube1Field1: document.querySelector('#clube1-field')
    , clube1Field2: document.querySelector('#clube2-field')
}
pageJogo.addJogoBtn.addEventListener('click', function () {
    //getAtletasCard();
    getClubesCard();
});

function removeAtletaJogo(idAtleta) {
    pageJogo.tableAtletasAdicionados.querySelector('#' + idAtleta).innerHTML = '';
    atletaSel = pageJogo.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + atletaSel.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " " + atletaSel.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '</tr>';
    $('#table-card-jogo').append(html);
}

function addAtletaJogo(idAtleta) {
    pageJogo.tableAtletasCard.querySelector('#' + idAtleta).innerHTML = '';
    atletaSel = pageJogo.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="removeAtletaJogo(\'' + atletaSel.uid + '\')" href="#" class="remove-jogador"><i class="material-icons">remove</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " " + atletaSel.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '<td><a onclick="estatisticasAtleta(\'' + atletaSel.uid + '\')" href="#" class="editar-dados-jogador"><i class="material-icons">mode_edit</i></a>';
    html += '</tr>';
    $('#table-card-atletas-jogo').append(html);
}

function preencheTabelaCard(tempAtleta) {
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + tempAtleta.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + tempAtleta.nome + " " + tempAtleta.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '</tr>';
    $('#table-card-jogo').append(html);
}

function getAtletasCard(tempClube) {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function (atletaHtml) {
        pageJogo.tableAtletasCard.innerHTML = '';
    })
    pageJogo.database.ref(pageClube.databaseAtletas).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtletaClube = atletaRef.val();
            if (tempClube == tempAtletaClube.clube) {
                preencheTabelaCard(tempAtletaClube);
            }
        });
    });
}

function getClubesCard() {
    pageJogo.database.ref(pageJogo.databaseClubes).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            pageJogo.clubes[clubeRef.key] = (tempClube);
            preencheSelectedClube(tempClube);
        });
    })
}

function showClubeSelecionado() {
    var clube1 = $('#clube1-field').val();
    getAtletasCard(clube1);
}
$('select').change(showClubeSelecionado);

function preencheSelectedClube(tempClube) {
    var newOption = document.createElement("option");
    var newOption2 = document.createElement("option");
    newOption.value = tempClube.nomeclube;
    newOption.innerHTML = tempClube.nomeclube;
    newOption2.value = tempClube.nomeclube;
    newOption2.innerHTML = tempClube.nomeclube;
    pageJogo.clube1Field1.options.add(newOption);
    pageJogo.clube1Field2.options.add(newOption2);
    showClubeSelecionado();
    $('select').material_select();
}