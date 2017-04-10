var pageJogo = {
    atletas: [],
    atletasJogo: [],
    jogos: [],
    clubes: [],
    database: firebase.database(),
    databaseRef: '/jogos/',
    jogosSideBtn: document.querySelector('#jogos-menu'),
    addAtletaJogoBtn: document.querySelector('#addAtletaJogoBtn'),
    addJogoBtn: document.querySelector('#addJogoBtn'),
    databaseAtletas: '/atletas/',
    databaseClubes: '/clubes/',
    tableJogos: document.querySelector('#table-jogos'),
    tableAtletasCard: document.querySelector('#body-card'),
    tableAtletasAdicionados: document.querySelector('#body-card-jogo'),
    clube1Field1: document.querySelector('#clube1-field'),
    clube1Field2: document.querySelector('#clube2-field'),
    golField: document.querySelector('#gol-field'),
    assistenciaField: document.querySelector('#assistencia-field'),
    cartaoAmareloField: document.querySelector('#cartaoamarelo-field'),
    cartaoVermelhoField: document.querySelector('#cartaovermelho-field'),
    minutosJogadosField: document.querySelector('#minutos-field'),
    idAtletaField: document.querySelector('#idAtleta'),
    salvarDadosBtn: document.querySelector('#salvar-dados-btn'),
    salvarJogoBtn: document.querySelector('#salvar-card'),
    dataField: document.querySelector('#datajogo-field'),
    campeonatoField: document.querySelector('#campeonato-field'),
    melhorJogadorField: document.querySelector('#melhor-jogador-field'),
    meuClubeField: document.querySelector('#clube1-field'),
    golsMeuClubeField: document.querySelector('#gols-clube1-field'),
    clubeAdversarioField: document.querySelector('#clube2-field'),
    golsClubeAdversarioField: document.querySelector('#gols-clube2-field'),
    localField: document.querySelector('#local-field'),
    jogoAtual: -1
}
pageJogo.addJogoBtn.addEventListener('click', function () {
    abreCardJogo(null);
});
pageJogo.jogosSideBtn.addEventListener('click', function () {
    getJogos();
});




function abreCardJogo(idJogo) {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function (atletaHtml) {
        pageJogo.tableAtletasAdicionados.innerHTML = '';
        pageJogo.tableAtletasCard.innerHTML = '';
    });
    pageJogo.jogoAtual = idJogo;
    $('#cardJogo').show();
    $('#cardAtletas').show();
    $('#table-jogos').hide();
    $('#addJogoBtn').hide();
    getClubesCard();
    if (idJogo) {
        jogoSel = pageJogo.jogos[idJogo]
        pageJogo.dataField.value = jogoSel.data;
        pageJogo.localField.value = jogoSel.local;
        pageJogo.campeonatoField.value = jogoSel.campeonato;
        pageJogo.melhorJogadorField.value = jogoSel.melhorjogador;

        $(pageJogo.meuClubeField).val(jogoSel.meuclube);
        $(pageJogo.meuClubeField).material_select();
        pageJogo.golsMeuClubeField.value = jogoSel.golsmeuclube;
        $(pageJogo.clubeAdversarioField).val(jogoSel.clubeadversario);
        $(pageJogo.clubeAdversarioField).material_select();
        pageJogo.golsClubeAdversarioField.value = jogoSel.golsclubeadversario;
        var atletasDoClube = separaAtletasQueJogaram(sortAtletas(pageAtleta.atletas, jogoSel.meuclube), jogoSel.atletasTempJogo)
        for (var key in atletasDoClube) {
            preencheTabelaCard(atletasDoClube[key])
        }
        for (var key in jogoSel.atletasTempJogo) {
            addAtletaJogo(key)
        }

    } else {

        pageJogo.idJogo = null;
        pageJogo.dataField.value = null;
        pageJogo.localField.value = null;
        pageJogo.campeonatoField.value = null;
        pageJogo.melhorJogadorField.value = null;
        $(pageJogo.meuClubeField).val();
        $(pageJogo.meuClubeField).material_select();
        pageJogo.golsMeuClubeField.value = null;
        $(pageJogo.clubeAdversarioField).val();
        $(pageJogo.clubeAdversarioField).material_select();
        pageJogo.golsClubeAdversarioField.value = null;
        pageJogo.golField.value = null;
        pageJogo.assistenciaField.value = null;
        pageJogo.cartaoAmareloField.value = null;
        pageJogo.cartaoVermelhoField.value = null;
        pageJogo.minutosJogadosField.value = null;
    }
}

function separaAtletasQueJogaram(atletasClube, atletasPartida) {
    var atletasFiltrados = atletasClube;
    for (var key in atletasPartida) {
        delete atletasFiltrados[key];
    }
    return atletasFiltrados;
}

function sortAtletas(atletas, clube) {
    var atletasFiltrados = []
    for (var key in atletas) {
        if (atletas[key].clube == clube) {
            atletasFiltrados[key] = atletas[key];
        }
    }
    return atletasFiltrados;
}

function novoJogo(jogo) {
    pageJogo.database.ref(pageJogo.databaseRef).push(jogo);
}

function excluirJogo(idJogo) {
    pageJogo.tableJogos.querySelector('#' + idJogo).innerHTML = '';
}

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
    htmlJogo += '<td><a onclick="abreCardJogo(\'' + tempJogo.uid + '\')" href="#" class="editar-jogo" id="editarJogo"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirJogo(\'' + tempJogo.uid + '\' )" href="#" class="excluir-jogo"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
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
    if (tempAtleta) {
        pageJogo.tableAtletasCard.removeChild(tempAtleta);
    }
    atletaSel = pageAtleta.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="removeAtletaJogo(\'' + idAtleta + '\')" href="#" class="remove-jogador"><i class="material-icons">remove</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " " + atletaSel.sobrenome + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '<td><a onclick="estatisticasAtleta(\'' + atletaSel.uid + '\', \'' + pageJogo.jogoAtual + '\')" href="#" class="editar-dados-jogador"><i class="material-icons">mode_edit</i></a>';
    html += '</tr>';
    $('#body-card-jogo').append(html);
}

function estatisticasAtleta(idAtleta, idJogo) {

    atletaSel = pageAtleta.atletas[idAtleta];
    var html = atletaSel.nome;
    document.querySelector('#nomeAtleta').innerHTML = html;
    $('#modalAtletaJogo').modal('open');

    var participacaoAtletaJogo = pageJogo.jogos[idJogo].atletasTempJogo[idAtleta];
    if (participacaoAtletaJogo) {
        pageJogo.idAtletaField.value = participacaoAtletaJogo.uid;
        pageJogo.golField.value = participacaoAtletaJogo.gol;
        pageJogo.assistenciaField.value = participacaoAtletaJogo.assistencia;
        pageJogo.cartaoAmareloField.value = participacaoAtletaJogo.cartaoamarelo;
        pageJogo.cartaoVermelhoField.value = participacaoAtletaJogo.cartaovermelho;
        pageJogo.minutosJogadosField.value = participacaoAtletaJogo.minutosjogados;
    } else {
        pageJogo.idAtletaField.value = idAtleta;
        pageJogo.golField.value = null;
        pageJogo.assistenciaField.value = null;
        pageJogo.cartaoAmareloField.value = null;
        pageJogo.cartaoVermelhoField.value = null;
        pageJogo.minutosJogadosField.value = null;
    }
}
pageJogo.salvarDadosBtn.addEventListener('click', function () {
    var tempAtletaJogo = {
        uid: pageJogo.idAtletaField.value,
        gol: pageJogo.golField.value,
        assistencia: pageJogo.assistenciaField.value,
        cartaoamarelo: pageJogo.cartaoAmareloField.value,
        cartaovermelho: pageJogo.cartaoVermelhoField.value,
        minutosjogados: pageJogo.minutosJogadosField.value
    }
    if (tempAtletaJogo.gol == '' || tempAtletaJogo.assistencia == '' || tempAtletaJogo.cartaoamarelo == '' || tempAtletaJogo.cartaovermelho == '' || tempAtletaJogo.minutosjogados == '') {
        swal("", "Todos os campos devem ser preenchidos!", "error");
    } else {
        swal("", "Dados salvos", "success");
        $('#modalAtletaJogo').modal('close');
        pageJogo.jogos[pageJogo.jogoAtual].atletasTempJogo[tempAtletaJogo.uid] = tempAtletaJogo;

        //console.log(pageJogo.atletasJogo);
    }
})
pageJogo.salvarJogoBtn.addEventListener('click', function () {
    var tempJogo = {
        data: pageJogo.dataField.value,
        local: pageJogo.localField.value,
        campeonato: pageJogo.campeonatoField.value,
        melhorjogador: pageJogo.melhorJogadorField.value,
        meuclube: pageJogo.meuClubeField.value,
        golsmeuclube: pageJogo.golsMeuClubeField.value,
        clubeadversario: pageJogo.clubeAdversarioField.value,
        golsclubeadversario: pageJogo.golsClubeAdversarioField.value,
        atletasTempJogo: pageJogo.atletasJogo
    }
    //atletasTempJogo = pageJogo.atletasJogo;
    console.log(tempJogo);
    novoJogo(tempJogo);
});

function preencheTabelaCard(tempAtleta) {
    var atletasNaTela = document.querySelectorAll('.idDosAtletas');
    atletasNaTela.forEach(function (atletaHtml) {
        pageJogo.tableAtletasCard.innerHTML = '';
    })
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
    });

    var tempAtletaClube = pageAtleta.atletas;
    for (var key in tempAtletaClube) {
        if (tempClube == tempAtletaClube[key].clube) {
            preencheTabelaCard(tempAtletaClube[key]);
        }
    }
}


function showClubeSelecionado() {
    var clube1 = $(pageJogo.meuClubeField).val();
    getAtletasCard(clube1);
}


$(pageJogo.meuClubeField).change(showClubeSelecionado);

function getClubesCard(tempClube) {
    $(pageJogo.meuClubeField).empty();
    $(pageJogo.clubeAdversarioField).empty();
    var tempClube = pageClube.clubes;
    for (var key in tempClube) {
        preencheSelectedClube(tempClube[key]);
    }
}

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
    $(pageJogo.meuClubeField).material_select();
    $(pageJogo.clubeAdversarioField).material_select();
}