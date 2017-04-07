var pageJogo = {
    atletas: []
    , atletasJogo: []
    , jogos: []
    , clubes: []
    , database: firebase.database()
    , databaseRef: '/jogos/'
    , jogosSideBtn: document.querySelector('#jogos-menu')
    , addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn')
    , addJogoBtn: document.querySelector('#addJogoBtn')
    , databaseAtletas: '/atletas/'
    , databaseClubes: '/clubes/'
    , tableJogos: document.querySelector('#table-jogos')
    , tableAtletasCard: document.querySelector('#body-card')
    , tableAtletasAdicionados: document.querySelector('#body-card-jogo')
    , clube1Field1: document.querySelector('#clube1-field')
    , clube1Field2: document.querySelector('#clube2-field')
    , golField: document.querySelector('#gol-field')
    , assistenciaField: document.querySelector('#assistencia-field')
    , cartaoAmareloField: document.querySelector('#cartaoamarelo-field')
    , cartaoVermelhoField: document.querySelector('#cartaovermelho-field')
    , minutosJogadosField: document.querySelector('#minutos-field')
    , idAtletaField: document.querySelector('#idAtleta')
    , salvarDadosBtn: document.querySelector('#salvar-dados-btn')
    , salvarJogoBtn: document.querySelector('#salvar-card')
    , dataField: document.querySelector('#datajogo-field')
    , campeonatoField: document.querySelector('#campeonato-field')
    , melhorJogadorField: document.querySelector('#melhor-jogador-field')
    , meuClubeField: document.querySelector('#clube1-field')
    , golsMeuClubeField: document.querySelector('#gols-clube1-field')
    , clubeAdversarioField: document.querySelector('#clube2-field')
    , golsClubeAdversarioField: document.querySelector('#gols-clube2-field')
    , localField: document.querySelector('#local-field')
}
pageJogo.addJogoBtn.addEventListener('click', function () {
    getClubesCard();
});
pageJogo.jogosSideBtn.addEventListener('click', function () {
    getJogos();
});

function getJogos() {
    var jogosNaTela = document.querySelectorAll('.idDosJogos');
    jogosNaTela.forEach(function () {
        pageJogo.tableJogos.querySelector('#body-jogos').innerHTML = '';
    });
    pageJogo.database.ref(pageJogo.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (jogoRef) {
            var tempJogo = jogoRef.val();
            tempJogo.uid = jogoRef.key;
            pageJogo.jogos[jogoRef.key] = (tempJogo);
            preencheTabelaJogo(tempJogo);
        });
    })
}

function preencheTabelaJogo(tempJogo) {
    var htmlJogo = '';
    htmlJogo += '<tr class="idDosJogos" id="' + tempJogo.uid + '">';
    htmlJogo += '<td class="dataJogoTabela">' + tempJogo.data;
    htmlJogo += '<td class="meuClubeTabela">' + tempJogo.meuclube;
    htmlJogo += '<td class="placarJogoTabela">' + tempJogo.golsmeuclube + " x " + tempJogo.golsclubeadversario;
    htmlJogo += '<td class="clubeAdversarioTabela">' + tempJogo.clubeadversario;
    htmlJogo += '<td class="campeonatoTabela">' + tempJogo.campeonato;
    htmlJogo += '<td class="localTabela">' + tempJogo.local;
    htmlJogo += '<td><a onclick="abreCardJogo(\'' + tempJogo.uid + '\')" href="#" class="editar-jogo"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirJogo(\'' + tempJogo.uid + '\' )" href="#" class="excluir-jogo"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    htmlJogo += '</tr>';
    $('#body-jogos').append(htmlJogo);
}

function removeAtletaJogo(idAtleta) {
    tempAtleta = pageJogo.tableAtletasAdicionados.querySelector('#' + idAtleta);
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
    tempAtleta = pageJogo.tableAtletasCard.querySelector('#' + idAtleta);
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

function estatisticasAtleta(idAtleta) {
    atletaSel = pageJogo.atletas[idAtleta];
    var html = atletaSel.nome;
    $('#nomeAtleta').append(html);
    $('#modalAtletaJogo').modal('open');
    pageJogo.idAtletaField.value = idAtleta;
    pageJogo.golField.value = null;
    pageJogo.assistenciaField.value = null;
    pageJogo.cartaoAmareloField.value = null;
    pageJogo.cartaoVermelhoField.value = null;
    pageJogo.minutosJogadosField.value = null;
}
pageJogo.salvarDadosBtn.addEventListener('click', function () {
    var tempAtletaJogo = {
        uid: pageJogo.idAtletaField.value
        , gol: pageJogo.golField.value
        , assistencia: pageJogo.assistenciaField.value
        , cartaoamarelo: pageJogo.cartaoAmareloField.value
        , cartaovermelho: pageJogo.cartaoVermelhoField.value
        , minutosjogados: pageJogo.minutosJogadosField.value
    }
    if (tempAtletaJogo.gol == '' || tempAtletaJogo.assistencia == '' || tempAtletaJogo.cartaoamarelo == '' || tempAtletaJogo.cartaovermelho == '' || tempAtletaJogo.minutosjogados == '') {
        swal("", "Todos os campos devem ser preenchidos!", "error");
    }
    else {
        swal("", "Dados salvos", "success");
        $('#modalAtletaJogo').modal('close');
        pageJogo.atletasJogo[tempAtletaJogo.uid] = tempAtletaJogo;
        //console.log(pageJogo.atletasJogo);
    }
})
pageJogo.salvarJogoBtn.addEventListener('click', function () {
    var tempJogo = {
            data: pageJogo.dataField.value
            , campeonato: pageJogo.campeonatoField.value
            , melhorjogador: pageJogo.melhorJogadorField.value
            , meuclube: pageJogo.meuClubeField.value
            , golsmeuclube: pageJogo.golsMeuClubeField.value
            , clubeadversario: pageJogo.clubeAdversarioField.value
            , golsclubeadversario: pageJogo.golsClubeAdversarioField.value
            , atletasTempJogo: pageJogo.atletasJogo
        }
        //atletasTempJogo = pageJogo.atletasJogo;
    console.log(tempJogo);
});

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
    pageJogo.database.ref(pageJogo.databaseAtletas).once('value').then(function (snapshot) {
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
$('#clube1-field').change(showClubeSelecionado);

function preencheSelectedClube(tempClube) {
    var newOption = document.createElement("option");
    var newOption2 = document.createElement("option");
    newOption.value = tempClube.nomeclube;
    newOption.innerHTML = tempClube.nomeclube;
    newOption2.value = tempClube.nomeclube;
    newOption2.innerHTML = tempClube.nomeclube;
    pageJogo.meuClubeField.options.add(newOption);
    pageJogo.clubeAdversarioField.options.add(newOption2);
    showClubeSelecionado();
    $('select').material_select();
}