var pageJogo = {
    atletas: []
    , atletasJogo: []
    , jogos: []
    , clubes: []
    , database: firebase.database()
    , databaseRef: '/jogos/'
    , dataBaseClube: '/clubes/'
    , dataBaseAtleta: '/atletas/'
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
    , idJogoField: document.querySelector('#id-jogo')
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
    , nomeAtletaField: document.querySelector('#nomeAtleta')
    , fotoAtletaField: document.querySelector('#foto-atleta-jogo')
    , jogoAtual: null
    , buscaJogoBtn: document.querySelector('#busca-jogo-btn')
    , buscaJogoField: document.querySelector('#busca-jogo-field')
    , apagarBuscaJogo: document.querySelector('#apagar-busca-jogo-btn')
    , fecharCardNovoJogo: document.querySelector('#voltarCardJogo')
}
pageJogo.addJogoBtn.addEventListener('click', function () {
    abreCardJogo(null);
    pageJogo.idJogoField.value = null;
    $('#buscaJogo').hide();
});
pageJogo.jogosSideBtn.addEventListener('click', function () {
    getClubesAtt();
    getAtletas();
    getJogos();
    $('#buscaJogo').show();
    pageJogo.buscaJogoField.value = "";
});
pageJogo.buscaJogoBtn.addEventListener('click', function () {
    getJogoPorNome(pageJogo.buscaJogoField.value);
});
pageJogo.apagarBuscaJogo.addEventListener('click', function () {
    pageJogo.buscaJogoField.value = "";
    getJogoPorNome(pageJogo.buscaJogoField.value);
});
pageJogo.fecharCardNovoJogo.addEventListener('click', function () {
    $('#buscaJogo').show();
})

function abreCardJogo(idJogo) {
    $('#buscaJogo').hide();
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
    $(pageJogo.meuClubeField).empty();
    $(pageJogo.clubeAdversarioField).empty();
    getClubesCard();
    if (idJogo) {
        jogoSel = pageJogo.jogos[idJogo]
        pageJogo.idJogoField.value = idJogo;
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
    }
    else {
        pageJogo.idJogoField.value = null;
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
    pageJogo.database.ref(pageJogo.databaseRef).push(jogo).then(swal("", "Jogo cadastrado com sucesso", "success"));;
}

function excluirJogo(idJogo) {
    pageJogo.database.ref(pageJogo.databaseRef + idJogo).remove().then(swal("", "Jogo removido com sucesso", "success"));
    pageJogo.tableJogos.querySelector('#' + idJogo).innerHTML = '';
}

function salvarAlteracoesJogo(tempJogo) {
    idJogo = pageJogo.idJogoField.value;
    tempJogo.data = pageJogo.dataField.value;
    tempJogo.local = pageJogo.localField.value;
    tempJogo.campeonato = pageJogo.campeonatoField.value;
    tempJogo.melhorjogador = pageJogo.melhorJogadorField.value;
    tempJogo.meuclube = pageJogo.meuClubeField.value;
    tempJogo.golsmeuclube = pageJogo.golsMeuClubeField.value;
    tempJogo.clubeadversario = pageJogo.clubeAdversarioField.value;
    tempJogo.golsclubeadversario = pageJogo.golsClubeAdversarioField.value;
    tempJogo.atletasTempJogo = pageJogo.jogos[idJogo].atletasTempJogo;
    pageJogo.database.ref(pageJogo.databaseRef + '/' + idJogo).update(tempJogo).then(swal("", "Jogo atualizado com sucesso", "success"));
}

function getJogos() {
    getClubes();
    limparTabelaJogo();
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
    htmlJogo += '<td class="meuClubeTabela">' + pageClube.clubes[tempJogo.meuclube].nomeclube;
    htmlJogo += '<td class="placarJogoTabela">' + tempJogo.golsmeuclube + " x " + tempJogo.golsclubeadversario;
    htmlJogo += '<td class="clubeAdversarioTabela">' + pageClube.clubes[tempJogo.clubeadversario].nomeclube;
    htmlJogo += '<td class="campeonatoTabela">' + tempJogo.campeonato;
    htmlJogo += '<td class="localTabela">' + tempJogo.local;
    htmlJogo += '<td><a onclick="abreCardJogo(\'' + tempJogo.uid + '\')" href="#" class="editar-jogo" id="editarJogo"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirJogo(\'' + tempJogo.uid + '\' )" href="#" class="excluir-jogo"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    htmlJogo += '</tr>';
    $('#body-jogos').append(htmlJogo);
}

function removeAtletaJogo(idAtleta) {
    tempAtleta = pageJogo.tableAtletasAdicionados.querySelector('#' + idAtleta);
    pageJogo.tableAtletasAdicionados.removeChild(tempAtleta);
    atletaSel = pageAtleta.atletas[idAtleta]
    if (pageJogo.idJogoField.value) {
        if (pageJogo.jogos[pageJogo.idJogoField.value].atletasTempJogo[idAtleta]) {
            delete pageJogo.jogos[pageJogo.idJogoField.value].atletasTempJogo[idAtleta];
        }
    }
    if (atletaSel.foto) {
        var htmlFoto = '<img width="32" height="32" src="' + atletaSel.foto + '"/>';
    }
    else {
        var htmlFoto = '<img width="32" height="32" src="img/mini_sem_foto.png"/>';
    }
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + atletaSel.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " - " + atletaSel.apelido + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '<td class="fotoJogadorTabela">' + htmlFoto + '</td>';
    html += '</tr>';
    $('#body-card').append(html);
}

function addAtletaJogo(idAtleta) {
    tempAtleta = pageJogo.tableAtletasCard.querySelector('#' + idAtleta);
    if (tempAtleta) {
        pageJogo.tableAtletasCard.removeChild(tempAtleta);
    }
    pageJogo.jogoAtual = pageJogo.idJogoField.value;
    atletaSel = pageAtleta.atletas[idAtleta]
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + idAtleta + '">';
    html += '<td><a onclick="removeAtletaJogo(\'' + idAtleta + '\')" href="#" class="remove-jogador"><i class="material-icons">remove</i></a></td>';
    html += '<td class="nomeJogadorTabela">' + atletaSel.nome + " - " + atletaSel.apelido + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + atletaSel.posicao + '</td>';
    html += '<td><a onclick="abreModalEstatisticaJogador(\'' + atletaSel.uid + '\', \'' + pageJogo.jogoAtual + '\')" href="#" class="editar-dados-jogador"><i class="material-icons">mode_edit</i></a>';
    html += '</tr>';
    $('#body-card-jogo').append(html);
}

function getEstatisticasAtletas(idAtleta, idJogo) {
    if (pageJogo.jogoAtual == null) {
        return null;
    }
    else if (pageJogo.jogoAtual === idJogo) {
        var jogoAtual = pageJogo.jogos[idJogo];
        return jogoAtual.atletasTempJogo[idAtleta];
    }
    else {
        return null;
    }
}

function abreModalEstatisticaJogador(idAtleta, idJogo) {
    var estatisticasAtleta = getEstatisticasAtletas(idAtleta, idJogo);
    pageJogo.idAtletaField.value = idAtleta;
    atletaSel = pageAtleta.atletas[idAtleta];
    if (atletaSel.foto) {
        var htmlFoto = '<img width="80" height="80" src="' + atletaSel.foto + '"/>';
    }
    else {
        var htmlFoto = '<img width="80" height="80" src="img/mini_sem_foto.png"/>';
    }
    pageJogo.nomeAtletaField.innerHTML = atletaSel.apelido;
    pageJogo.fotoAtletaField.innerHTML = htmlFoto;
    //console.log(estatisticasAtleta, idAtleta, idJogo)
    if (estatisticasAtleta) {
        pageJogo.jogoAtual = idJogo;
        pageJogo.golField.value = estatisticasAtleta.gol;
        pageJogo.assistenciaField.value = estatisticasAtleta.assistencia;
        pageJogo.cartaoAmareloField.value = estatisticasAtleta.cartaoamarelo;
        pageJogo.cartaoVermelhoField.value = estatisticasAtleta.cartaovermelho;
        pageJogo.minutosJogadosField.value = estatisticasAtleta.minutosjogados;
        pageJogo.jogos[pageJogo.jogoAtual].atletasTempJogo[idAtleta] = estatisticasAtleta;
    }
    else {
        var tempAtleta = pageJogo.atletasJogo[idAtleta]
        if (tempAtleta == null) {
            pageJogo.idAtletaField.value = idAtleta;
            pageJogo.golField.value = null;
            pageJogo.assistenciaField.value = null;
            pageJogo.cartaoAmareloField.value = null;
            pageJogo.cartaoVermelhoField.value = null;
            pageJogo.minutosJogadosField.value = null;
        }
        else {
            pageJogo.idAtletaField.value = idAtleta;
            pageJogo.golField.value = tempAtleta.gol;
            pageJogo.assistenciaField.value = tempAtleta.assistencia;
            pageJogo.cartaoAmareloField.value = tempAtleta.cartaoamarelo;
            pageJogo.cartaoVermelhoField.value = tempAtleta.cartaovermelho;
            pageJogo.minutosJogadosField.value = tempAtleta.minutosjogados;
        }
    }
    $('#modalAtletaJogo').modal('open');
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
    if (pageJogo.idJogoField.value) {
        if (tempAtletaJogo.gol == '' || tempAtletaJogo.assistencia == '' || tempAtletaJogo.cartaoamarelo == '' || tempAtletaJogo.cartaovermelho == '' || tempAtletaJogo.minutosjogados == '') {
            swal("", "Todos os campos devem ser preenchidos!", "error");
        }
        else {
            swal("", "Dados salvos", "success");
            $('#modalAtletaJogo').modal('close');
            pageJogo.jogoAtual = pageJogo.idJogoField.value;
            pageJogo.jogos[pageJogo.jogoAtual].atletasTempJogo[tempAtletaJogo.uid] = tempAtletaJogo;
        }
    }
    else {
        tempAtletaJogo.uid = pageJogo.idAtletaField.value;
        tempAtletaJogo.gol = pageJogo.golField.value;
        tempAtletaJogo.assistencia = pageJogo.assistenciaField.value;
        tempAtletaJogo.cartaoamarelo = pageJogo.cartaoAmareloField.value;
        tempAtletaJogo.cartaovermelho = pageJogo.cartaoVermelhoField.value;
        tempAtletaJogo.minutosjogados = pageJogo.minutosJogadosField.value;
        if (tempAtletaJogo.gol == '' || tempAtletaJogo.assistencia == '' || tempAtletaJogo.cartaoamarelo == '' || tempAtletaJogo.cartaovermelho == '' || tempAtletaJogo.minutosjogados == '') {
            swal("", "Todos os campos devem ser preenchidos!", "error");
        }
        else {
            swal("", "Dados salvos", "success");
            $('#modalAtletaJogo').modal('close');
            pageJogo.jogoAtual = pageJogo.idJogoField.value;
            pageJogo.atletasJogo[tempAtletaJogo.uid] = tempAtletaJogo;
            //pageJogo.jogos[null].atletasTempJogo[tempAtletaJogo.uid] = tempAtletaJogo;
        }
    }
})
pageJogo.salvarJogoBtn.addEventListener('click', function () {
    pageJogo.buscaJogoField.value = "";
    $('#buscaJogo').show();
    var tempJogo = [];
    if (pageJogo.idJogoField.value) {
        tempJogo = {
            uid: pageJogo.idJogoField.value
            , data: pageJogo.dataField.value
            , local: pageJogo.localField.value
            , campeonato: pageJogo.campeonatoField.value
            , melhorjogador: pageJogo.melhorJogadorField.value
            , meuclube: pageJogo.meuClubeField.value
            , golsmeuclube: pageJogo.golsMeuClubeField.value
            , clubeadversario: pageJogo.clubeAdversarioField.value
            , golsclubeadversario: pageJogo.golsClubeAdversarioField.value
            , atletasTempJogo: pageJogo.atletasJogo[pageJogo.idJogoField.value]
        }
    }
    else {
        tempJogo = {
            data: pageJogo.dataField.value
            , local: pageJogo.localField.value
            , campeonato: pageJogo.campeonatoField.value
            , melhorjogador: pageJogo.melhorJogadorField.value
            , meuclube: pageJogo.meuClubeField.value
            , golsmeuclube: pageJogo.golsMeuClubeField.value
            , clubeadversario: pageJogo.clubeAdversarioField.value
            , golsclubeadversario: pageJogo.golsClubeAdversarioField.value
            , atletasTempJogo: pageJogo.atletasJogo
        }
    }
    if (tempJogo.data == '' || tempJogo.local == '' || tempJogo.campeonato == '' || tempJogo.melhorjogador == '' || tempJogo.meuclube == '' || tempJogo.golsmeuclube == '' || tempJogo.clubeadversario == '') {
        swal("Aviso!", "Todos os campos devem ser preenchidos!");
        console.log(tempJogo)
    }
    else {
        if (pageJogo.idJogoField.value) {
            salvarAlteracoesJogo(tempJogo);
            swal("", "Os dados do jogo foram alterados com sucesso!", "success");
            $('#cardJogo').hide();
            $('#cardAtletas').hide();
            $('#table-jogos').show();
            $('#addJogoBtn').show();
            getJogos();
        }
        else {
            novoJogo(tempJogo);
            swal("", "Jogo cadastrado com sucesso!", "success");
            $('#cardJogo').hide();
            $('#cardAtletas').hide();
            $('#table-jogos').show();
            $('#addJogoBtn').show();
            getJogos();
        }
    }
});

function preencheTabelaCard(tempAtleta) {
    if (tempAtleta.foto) {
        var htmlFoto = '<img width="32" height="32" src="' + tempAtleta.foto + '"/>';
    }
    else {
        var htmlFoto = '<img width="32" height="32" src="img/mini_sem_foto.png"/>';
    }
    var html = '';
    html += '<tr  class="idDosAtletas" id="' + tempAtleta.uid + '">';
    html += '<td><a onclick="addAtletaJogo(\'' + tempAtleta.uid + '\')" href="#" class="add-jogador"><i class="material-icons">add</i></a></td>'
    html += '<td class="nomeJogadorTabela">' + tempAtleta.nome + " - " + tempAtleta.apelido + '</a></td>';
    html += '<td class="posicaoJogadorTabela">' + tempAtleta.posicao + '</td>';
    html += '<td class="fotoJogadorTabela">' + htmlFoto + '</td>';
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

function getClubesCard() {
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    var newOption2 = document.createElement("option");
    newOption2.value = "-";
    newOption2.innerHTML = "-";
    pageJogo.meuClubeField.options.add(newOption);
    pageJogo.clubeAdversarioField.options.add(newOption2);
    var tempClube = pageClube.clubes;
    for (var key in tempClube) {
        preencheSelectedClube(tempClube[key]);
    }
}

function preencheSelectedClube(tempClube) {
    var newOption = document.createElement("option");
    var newOption2 = document.createElement("option");
    newOption.value = tempClube.uid;
    newOption.innerHTML = tempClube.nomeclube;
    newOption2.value = tempClube.uid;
    newOption2.innerHTML = tempClube.nomeclube;
    pageJogo.meuClubeField.options.add(newOption);
    pageJogo.clubeAdversarioField.options.add(newOption2);
    showClubeSelecionado();
}

function getJogoPorNome(nomeJogo) {
    limparTabelaJogo();
    for (var key in pageJogo.jogos) {
        idJogo = pageJogo.jogos[key];
        idMeuClube = pageJogo.jogos[key].meuclube;
        idClubeAdversario = pageJogo.jogos[key].clubeadversario;
        meuClube = pageClube.clubes[idMeuClube];
        clubeAdversario = pageClube.clubes[idClubeAdversario];
        if (meuClube.nomeclube.toLowerCase().search(nomeJogo.toLowerCase()) != -1 || clubeAdversario.nomeclube.toLowerCase().search(nomeJogo.toLowerCase()) != -1) {
            preencheTabelaJogo(idJogo);
        }
    }
}

function limparTabelaJogo() {
    var jogosNaTela = document.querySelectorAll('.idDosJogos');
    jogosNaTela.forEach(function () {
        pageJogo.tableJogos.querySelector('#body-jogos').innerHTML = '';
    });
}