var pageJogo = {
    atletas: []
    , clubes: []
    , database: firebase.database()
    , databaseRef: '/jogos/'
    , addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn')
    , addJogoBtn: document.querySelector('#addJogoBtn')
    , databaseAtletas: '/atletas/'
    , databaseClubes: '/clubes/'
    , tableAtletasCard: document.querySelector('#body-card')
    , tableAtletasAdicionados: document.querySelector('#body-card-jogo')
    , clube1Field1: document.querySelector('#clube1-field')
    , clube1Field2: document.querySelector('#clube2-field')
}
pageJogo.addJogoBtn.addEventListener('click', function () {
    getClubesCard();
});

function removeAtletaJogo(idAtleta) {
    tempAtleta = pageJogo.tableAtletasAdicionados.querySelector('#'+idAtleta);
    pageJogo.tableAtletasAdicionados.removeChild(tempAtleta);
    
    atletaSel = pageJogo.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + atletaSel.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " " + atletaSel.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '</tr>';
    $('#body-card').append(html);
}

function addAtletaJogo(idAtleta) {
    tempAtleta = pageJogo.tableAtletasCard.querySelector('#'+idAtleta);
    pageJogo.tableAtletasCard.removeChild(tempAtleta);
    atletaSel = pageJogo.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="removeAtletaJogo(\'' + idAtleta + '\')" href="#" class="remove-jogador"><i class="material-icons">remove</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " " + atletaSel.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '<td><a onclick="estatisticasAtleta(\'' + atletaSel.uid + '\')" href="#" class="editar-dados-jogador"><i class="material-icons">mode_edit</i></a>';
    html += '</tr>';
    $('#body-card-jogo').append(html);
}

function estatisticasAtleta(idAtleta)
{
    atletaSel = pageJogo.atletas[idAtleta]
    
}

function preencheTabelaCard(tempAtleta) {
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + tempAtleta.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + tempAtleta.nome + " " + tempAtleta.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '</tr>';
    $('#body-card').append(html);
}

function getAtletasCard(tempClube) {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function (atletaHtml) {
        pageJogo.tableAtletasCard.innerHTML = '';
    })
    pageJogo.database.ref(pageClube.databaseAtletas).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            var tempAtletaClube = atletaRef.val();
            tempAtletaClube.uid = atletaRef.key;
            pageJogo.atletas[atletaRef.key] = (tempAtletaClube);
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