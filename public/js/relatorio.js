var pageRelatorio = {
    golsPro: 0,
    golsContra: 0,
    vitorias: 0,
    derrotas: 0,
    empates: 0,
    reportAtleta: document.querySelector('#report-atleta')
    , reportClube: document.querySelector('#report-clube')
    , atletaField: document.querySelector('#report-atleta-combo')
    , clubeField: document.querySelector('#report-clube-combo')
    , dataInicioField: document.querySelector('#data-inicio-field')
    , dataFimField: document.querySelector('#data-fim-field')
    , searchBtn: document.querySelector('#search-btn')
    , bodyDadosClubes: document.querySelector('#body-dados-clube')
    , limparBtn: document.querySelector('#limpar-relatorio'),
    estatisticasClube: document.querySelector('#estatisticas-clube'),
    tableEstatisticasClube: document.querySelector('#table-estatistica-clube')
}
pageRelatorio.reportAtleta.addEventListener('click', function () {
    $(pageRelatorio.tableEstatisticasClube).hide();
    getClubesReport();
    getJogos();
})
pageRelatorio.reportClube.addEventListener('click', function () {
    $(pageRelatorio.tableEstatisticasClube).hide();
    getClubesReport();
    getJogos();
})
pageRelatorio.searchBtn.addEventListener('click', function () {
    $(pageRelatorio.tableEstatisticasClube).show();
    pageRelatorio.golsPro = 0;
        pageRelatorio.golsContra = 0;
        pageRelatorio.vitorias = 0;
        pageRelatorio.derrotas = 0;
        pageRelatorio.empates = 0;
    
    var clubeSelecionado = $(pageRelatorio.clubeField).val();
    getDadosClube(clubeSelecionado);
    var tempDados = {
        golsPro: pageRelatorio.golsPro,
        golsContra: pageRelatorio.golsContra,
        vitorias: pageRelatorio.vitorias,
        derrotas: pageRelatorio.derrotas,
        empates: pageRelatorio.empates
    }
    getEstatisticasClube(tempDados);
})

function getEstatisticasClube(tempDados)
{
    var qtdJogos = tempDados.vitorias + tempDados.derrotas + tempDados.empates;
    var saldoDeGols = tempDados.golsPro - tempDados.golsContra;
    var htmlDados = '<td>' + qtdJogos + '</td>';
    htmlDados += '<td>' + tempDados.vitorias + '</td>';
    htmlDados += '<td>' + tempDados.empates + '</td>';
    htmlDados += '<td>' + tempDados.derrotas + '</td>';
    htmlDados += '<td>' + tempDados.golsPro + '</td>';
    htmlDados += '<td>' + tempDados.golsContra + '</td>';
    htmlDados += '<td>' + saldoDeGols + '</td><p>';
    pageRelatorio.estatisticasClube.innerHTML = htmlDados;
}

function getDadosClube(tempClube) {
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function (jogosHtml) {
        pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
    tempJogosClube = pageJogo.jogos;
    var dadosClube = [];
    var trocaDados = [];
    for (var key in tempJogosClube) {
        if (tempClube == tempJogosClube[key].meuclube) {
            dadosClube = tempJogosClube[key];
            dadosClube.golsPro = tempJogosClube[key].golsmeuclube;
            dadosClube.golsContra = tempJogosClube[key].golsclubeadversario;
            preencheReportClube(dadosClube);
        }
        if (tempClube == tempJogosClube[key].clubeadversario) {
            trocaDados.meuclube = tempJogosClube[key].clubeadversario;
            trocaDados.golsmeuclube = tempJogosClube[key].golsclubeadversario;
            trocaDados.clubeadversario = tempJogosClube[key].meuclube;
            trocaDados.golsclubeadversario = tempJogosClube[key].golsmeuclube;
            trocaDados.local = tempJogosClube[key].local;
            trocaDados.data = tempJogosClube[key].data;
            trocaDados.uid = tempJogosClube[key].uid;
            trocaDados.golsPro = trocaDados.golsmeuclube;
            trocaDados.golsContra = trocaDados.golsclubeadversario;
            preencheReportClube(trocaDados);
        }
    }
}

function preencheReportClube(tempJogosClube) {
    var dadosClube = tempJogosClube;
    pageRelatorio.golsPro += parseInt(tempJogosClube.golsPro);
    pageRelatorio.golsContra += parseInt(tempJogosClube.golsContra);
    
    if(tempJogosClube.golsmeuclube > tempJogosClube.golsclubeadversario){
        pageRelatorio.vitorias++;
    } else if(tempJogosClube.golsmeuclube < tempJogosClube.golsclubeadversario){
        pageRelatorio.derrotas++;
    } else {
        pageRelatorio.empates++;
    }
    var html = '';
    html += '<tr  class="idDosJogosFiltrados" id="' + dadosClube.uid + '">';
    html += '<td class="meuClube">' + dadosClube.meuclube + '</a></td>';
    html += '<td class="placar">' + dadosClube.golsmeuclube + "x" + dadosClube.golsclubeadversario + '</td>';
    html += '<td class="clubeAdversario">' + dadosClube.clubeadversario + '</td>';
    html += '<td class="localJogo">' + dadosClube.local + '</td>';
    html += '<td class="dataJogo">' + dadosClube.data + '</td>';
    html += '</tr>';
    $('#body-dados-clube').append(html);
}

function getClubesReport() {
    $(pageRelatorio.clubeField).empty();
    var newOption = document.createElement("option");
    newOption.value = "Sem Clube";
    newOption.innerHTML = "Sem Clube";
    pageRelatorio.clubeField.options.add(newOption);
    var tempClube = [];
    tempClube = pageClube.clubes;
    for (var key in tempClube) {
        preencheComboClubeReport(tempClube[key]);
    }
}

function preencheComboClubeReport(tempClube) {
    var newOption = document.createElement("option");
    newOption.value = tempClube.nomeclube;
    newOption.innerHTML = tempClube.nomeclube;
    pageRelatorio.clubeField.options.add(newOption);
    $(pageRelatorio.clubeField).material_select();
}
pageRelatorio.limparBtn.addEventListener('click', function () {
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function (jogosHtml) {
        pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
    pageRelatorio.dataInicioField.value = '';
    pageRelatorio.dataFimField.value = '';
    $(pageRelatorio.tableEstatisticasClube).hide();
})