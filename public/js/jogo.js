var pageJogo = {
    atletas: []
    , database: firebase.database()
    , databaseRef: '/jogos/'
    , addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn')
    , addJogoBtn: document.querySelector('#addJogoBtn')
    , databaseAtletas: '/atletas/'
    , tableAtletasCard: document.querySelector('#table-card-jogo')
    , tableAtletasAdicionados: document.querySelector('#table-card-atletas-jogo')
}
pageJogo.addJogoBtn.addEventListener('click', getAtletasCard);

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

function getAtletasCard() {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function (atletaHtml) {
        pageJogo.tableAtletasCard.innerHTML = '';
    })
    pageJogo.database.ref(pageJogo.databaseAtletas).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            pageJogo.atletas[atletaRef.key] = (tempAtleta);
            preencheTabelaCard(tempAtleta);
        });
    })
}

function getClubesCard() {
    pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            pageClube.clubes[clubeRef.key] = (tempClube);
            preencheTabelaClube(tempClube);
        });
    })
}