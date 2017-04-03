var pageJogo = {
    database: firebase.database()
    , databaseRef: '/jogos/'
    , addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn')
    , addJogoBtn: document.querySelector('#addJogoBtn')
    , databaseAtletas: '/atletas/'
    , tableAtletasAdd: document.querySelector('#table-card-jogo')
}

function addAtletaJogo(idAtleta)
{
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="removeAtletaJogo(\'' + tempAtleta.uid + '\')" href="#" class="remove-jogador"><i class="material-icons">remove</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + idAtleta + " " + tempAtleta.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '<td><a onclick="estatisticasAtleta(\'' + tempAtleta.uid + '\')" href="#" class="editar-dados-jogador"><i class="material-icons">mode_edit</i></a>';
    html += '</tr>';
    $('#table-card-atletas-jogo').append(html);
    
}

function getAtletas() {
    pageJogo.database.ref(pageJogo.databaseAtletas).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtleta = atletaRef.val();
            tempAtleta.uid = atletaRef.key;
            pageAtleta.atletas[atletaRef.key] = (tempAtleta);
            preencheTabela(tempAtleta);
        });
    })
}

function preencheTabela(tempAtleta) {
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + tempAtleta.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + tempAtleta.nome + " " + tempAtleta.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '</tr>';
    $('#body-card').append(html);
    $('#body-card').innerHTML = '';
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

function getAtletasByNome(atleta) {
    page.database.ref('atletas/' + atleta.atletaId).once('value').then(function (snapshot) {
        snapshot.forEach(function (atleta) {
            console.log(atleta.val());
        });
    });
}