var pageRelatorio = {
    golsPro: 0
    , golsContra: 0
    , vitorias: 0
    , derrotas: 0
    , empates: 0
    , reportAtleta: document.querySelector('#report-atleta')
    , reportClube: document.querySelector('#report-clube')
    , atletaField: document.querySelector('#report-atleta-combo')
    , clubeField: document.querySelector('#report-clube-combo')
    , dataInicioField: document.querySelector('#data-inicio-field')
    , dataFimField: document.querySelector('#data-fim-field')
    , searchBtn: document.querySelector('#search-btn')
    , bodyDadosClubes: document.querySelector('#body-dados-clube')
    , limparBtn: document.querySelector('#limpar-relatorio')
    , estatisticasClube: document.querySelector('#estatisticas-clube')
    , divEstatisticasClube: document.querySelector('#div-estatistica-clube')
    , jogosClubeField: document.querySelector('#jogos-clube')
    , vitoriasClubeField: document.querySelector('#vitorias-clube')
    , empatesClubeField: document.querySelector('#empates-clube')
    , derrotasClubeField: document.querySelector('#derrotas-clube')
    , golsProClubeField: document.querySelector('#golspro-clube')
    , golsContraClubeField: document.querySelector('#golscontra-clube')
    , saldoDeGolsClubeField: document.querySelector('#saldodegols-clube')
    , aproveitamentoClubeField: document.querySelector('#aproveitamento-clube')
    , listaReportSpan: document.querySelector('#lista-report')
    , tableDadosClube: document.querySelector('#table-dados-clubes')
    , btnExport: document.querySelector('#btnExport')
    , labelExport: document.querySelector('#label-export')
    , atletaAtual: -1
    , clubeAtual: -1
}
pageRelatorio.btnExport.addEventListener('click', function () {
    if (pageRelatorio.labelExport.innerHTML == 'Exportar Jogos') {
        exportRelatorioClube();
    }
    else {
        swal("", "Nao tem função pra clube ainda", "error");
    }
})
pageRelatorio.reportAtleta.addEventListener('click', function () {
    $(pageRelatorio.divEstatisticasClube).hide();
    $(pageRelatorio.tableDadosClube).hide();
    pageRelatorio.listaReportSpan.innerHTML = 'Lista de Atletas';
    pageRelatorio.bodyDadosClubes.innerHTML = '';
    pageRelatorio.labelExport.innerHTML = 'Exportar Dados';
    pageRelatorio.atletaAtual = 1;
    pageRelatorio.clubeAtual = 0;
    getClubesCombo();
    
    getJogos();
})
pageRelatorio.reportClube.addEventListener('click', function () {
    $(pageRelatorio.divEstatisticasClube).hide();
    $(pageRelatorio.tableDadosClube).show();
    pageRelatorio.listaReportSpan.innerHTML = 'Lista de Jogos';
    pageRelatorio.bodyDadosClubes.innerHTML = '';
    pageRelatorio.labelExport.innerHTML = 'Exportar Jogos';
    pageRelatorio.atletaAtual = 0;
    pageRelatorio.clubeAtual = 1;
    getClubesCombo();
    getJogos();
})
pageRelatorio.searchBtn.addEventListener('click', function () {
    var tempDados = {
        golsPro: pageRelatorio.golsPro
        , golsContra: pageRelatorio.golsContra
        , vitorias: pageRelatorio.vitorias
        , derrotas: pageRelatorio.derrotas
        , empates: pageRelatorio.empates
    }
    
    pageRelatorio.golsPro = 0;
    pageRelatorio.golsContra = 0;
    pageRelatorio.vitorias = 0;
    pageRelatorio.derrotas = 0;
    pageRelatorio.empates = 0;
    
    var clubeSelecionado = $(pageRelatorio.clubeField).val();
    getDadosClube(clubeSelecionado);
    
    if(pageRelatorio.clubeAtual == 1)
    {
        getEstatisticasClube(tempDados);
        $(pageRelatorio.divEstatisticasClube).show();
    } else {
        //console.log(pageRelatorio.atletaField.value)
        //atletaSel = pageAtleta.atletas[pageRelatorio.atletaField.value];
       // atletaSel.clube;
        //console.log(atletaSel)
        getEstatisticasAtleta(tempDadosAtleta, clubeSelecionado);
    }
})
function showClube() {
    var clube1 = $(pageRelatorio.clubeField).val();
    getAtletasCombo(clube1);
}


$(pageRelatorio.clubeField).change(showClube);

function getEstatisticasAtleta(tempAtleta, tempClube)
{
    
}

function getAtletasCombo(tempClube) {
    $(pageRelatorio.atletaField).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.atletaField.options.add(newOption);
    var tempAtleta = [];
    tempAtleta = pageAtleta.atletas;
    for (var key in tempAtleta) {
        if(tempAtleta[key].clube == tempClube)
        {
            preencheComboAtletaReport(tempAtleta[key]);
        }
    }
}

function preencheComboAtletaReport(tempAtleta) {
    var newOption = document.createElement("option");
    newOption.value = tempAtleta.uid;
    newOption.innerHTML = tempAtleta.nome + " - " + tempAtleta.apelido;
    pageRelatorio.atletaField.options.add(newOption);
    $(pageRelatorio.atletaField).material_select();
}

function getEstatisticasClube(tempDados) {
    var qtdJogos = tempDados.vitorias + tempDados.derrotas + tempDados.empates;
    var saldoDeGols = tempDados.golsPro - tempDados.golsContra;
    var ptsClube = (tempDados.vitorias * 3) + (tempDados.empates * 1);
    var aproveitamentoClube = (ptsClube / (qtdJogos * 3) * 100).toFixed(2) + "%";
    if (aproveitamentoClube == "NaN%") {
        aproveitamentoClube = 0
    }
    pageRelatorio.jogosClubeField.innerHTML = '<td>' + qtdJogos + '</td>';
    pageRelatorio.vitoriasClubeField.innerHTML = '<td>' + tempDados.vitorias + '</td>';
    pageRelatorio.empatesClubeField.innerHTML = '<td>' + tempDados.empates + '</td>';
    pageRelatorio.derrotasClubeField.innerHTML = '<td>' + tempDados.derrotas + '</td>';
    pageRelatorio.golsProClubeField.innerHTML = '<td>' + tempDados.golsPro + '</td>';
    pageRelatorio.golsContraClubeField.innerHTML = '<td>' + tempDados.golsContra + '</td>';
    pageRelatorio.saldoDeGolsClubeField.innerHTML = '<td>' + saldoDeGols + '</td>';
    pageRelatorio.aproveitamentoClubeField.innerHTML = '<td>' + aproveitamentoClube + '</td>';
}

function getDadosClube(tempClube) {
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function (jogosHtml) {
        pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
    tempJogosClube = pageJogo.jogos;
    var dadosClube = [];
    var trocaDados = [];
    //FORMATAR DATAS PREENCHIDAS NO RELATORIO
    var dataInicio = $(pageRelatorio.dataInicioField).val().split("/");
    var dataInicioFormat = new Date(dataInicio[2], dataInicio[1] - 1, dataInicio[0]);
    var dataFim = $(pageRelatorio.dataFimField).val().split("/");
    var dataFimFormat = new Date(dataFim[2], dataFim[1] - 1, dataFim[0]);
    if (dataInicioFormat > dataFimFormat) {
        swal("", "A data final não pode ser menor que a inicial", "error");
    }
    else {
        
        for (var key in tempJogosClube) {
            if (tempClube == tempJogosClube[key].meuclube) {
                var dataJogo = tempJogosClube[key].data.split("/");
                var dataJogoFormat = new Date(dataJogo[2], dataJogo[1] - 1, dataJogo[0]);
                dadosClube = tempJogosClube[key];
                dadosClube.golsPro = tempJogosClube[key].golsmeuclube;
                dadosClube.golsContra = tempJogosClube[key].golsclubeadversario;
                if (dataJogoFormat >= dataInicioFormat && dataJogoFormat <= dataFimFormat) {
                    preencheReportClube(dadosClube);
                }
                if (dataInicio == '' && dataFim == '') {
                    preencheReportClube(dadosClube);
                }
            }
            if (tempClube == tempJogosClube[key].clubeadversario) {
                var dataJogo = tempJogosClube[key].data.split("/");
                var dataJogoFormat = new Date(dataJogo[2], dataJogo[1] - 1, dataJogo[0]);
                trocaDados.meuclube = tempJogosClube[key].clubeadversario;
                trocaDados.golsmeuclube = tempJogosClube[key].golsclubeadversario;
                trocaDados.clubeadversario = tempJogosClube[key].meuclube;
                trocaDados.golsclubeadversario = tempJogosClube[key].golsmeuclube;
                trocaDados.local = tempJogosClube[key].local;
                trocaDados.data = tempJogosClube[key].data;
                trocaDados.uid = tempJogosClube[key].uid;
                trocaDados.golsPro = trocaDados.golsmeuclube;
                trocaDados.golsContra = trocaDados.golsclubeadversario;
                if (dataJogoFormat >= dataInicioFormat && dataJogoFormat <= dataFimFormat) {
                    preencheReportClube(trocaDados);
                }
                if (dataInicio == '' && dataFim == '') {
                    preencheReportClube(trocaDados);
                }
            }
        }
    }
}

function preencheReportClube(tempJogosClube) {
    var dadosClube = tempJogosClube;
    pageRelatorio.golsPro += parseInt(tempJogosClube.golsPro);
    pageRelatorio.golsContra += parseInt(tempJogosClube.golsContra);
    if (tempJogosClube.golsmeuclube > tempJogosClube.golsclubeadversario) {
        pageRelatorio.vitorias++;
    }
    else if (tempJogosClube.golsmeuclube < tempJogosClube.golsclubeadversario) {
        pageRelatorio.derrotas++;
    }
    else {
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

function getClubesCombo() {
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
    if(pageRelatorio.atletaAtual == 1)
    {
        getAtletasCombo();
    }
    
}

function preencheComboClubeReport(tempClube) {
    var newOption = document.createElement("option");
    newOption.value = tempClube.nomeclube;
    newOption.innerHTML = tempClube.nomeclube;
    pageRelatorio.clubeField.options.add(newOption);
    $(pageRelatorio.clubeField).material_select();
}

function exportRelatorioClube() {
    if (pageRelatorio.bodyDadosClubes.innerHTML == '') {
        swal("", "Selecione uma opção!", "error");
    }
    else {
        var tab_text = "<table border='2px'><tr>                            <th>Clube</th><th>Placar</th><th>Adversário</th><th>Local</th>                            <th>Data</th></tr><tr>";
        var textRange;
        var j = 0;
        tab = pageRelatorio.bodyDadosClubes; // id of table
        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }
        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        }
        else //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + escape(tab_text));
        return (sa);
    }
}
pageRelatorio.limparBtn.addEventListener('click', function () {
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function (jogosHtml) {
        pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
    pageRelatorio.dataInicioField.value = '';
    pageRelatorio.dataFimField.value = '';
    $(pageRelatorio.divEstatisticasClube).hide();
})