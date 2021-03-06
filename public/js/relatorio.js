var pageRelatorio = {
    golsPro: 0
    , golsContra: 0
    , vitorias: 0
    , derrotas: 0
    , empates: 0
    , assistenciaAtleta: 0
    , golAtleta: 0
    , cartaoAmareloAtleta: 0
    , cartaoVermelhoAtleta: 0
    , minutosJogadosAtleta: 0
    , jogosAtleta: 0
    , golsPorJogo: 0
    , assistenciasPorJogo: 0
    , cAmareloPorJogo: 0
    , cVermelhoPorJogo: 0
    , golsNoJogo: 0
    , assistenciasNoJogo: 0
    , cAmareloNoJogo: 0
    , cVermelhoNoJogo: 0
    , minutosJogadosNoJogo: 0
    , tableDadosAtletasJogo: document.querySelector('#table-dados-atletas-jogo')
    , bodyDadosAtletasJogo: document.querySelector('#body-dados-atleta-jogo')
    , reportAtleta: document.querySelector('#report-atleta')
    , reportClube: document.querySelector('#report-clube')
    , atletaField: document.querySelector('#report-atleta-combo')
    , clubeField: document.querySelector('#report-clube-combo')
    , dataInicioField: document.querySelector('#data-inicio-field')
    , dataFimField: document.querySelector('#data-fim-field')
    , searchBtn: document.querySelector('#search-btn')
    , bodyDadosClubes: document.querySelector('#body-dados-clube')
    , bodyDadosAtletas: document.querySelector('#body-dados-atleta')
    , limparBtn: document.querySelector('#limpar-relatorio')
    , estatisticasClube: document.querySelector('#estatisticas-clube')
    , divEstatisticasClube: document.querySelector('#div-estatistica-clube')
    , divEstatisticasAtleta: document.querySelector('#div-estatistica-atleta')
    , jogosClubeField: document.querySelector('#jogos-clube')
    , vitoriasClubeField: document.querySelector('#vitorias-clube')
    , empatesClubeField: document.querySelector('#empates-clube')
    , derrotasClubeField: document.querySelector('#derrotas-clube')
    , golsProClubeField: document.querySelector('#golspro-clube')
    , golsContraClubeField: document.querySelector('#golscontra-clube')
    , saldoDeGolsClubeField: document.querySelector('#saldodegols-clube')
    , aproveitamentoClubeField: document.querySelector('#aproveitamento-clube')
    , golAtletaField: document.querySelector('#gols-atleta')
    , assistenciaAtletaField: document.querySelector('#assistencias-atleta')
    , cartaoAmareloAtletaField: document.querySelector('#cartao-amarelo-atleta')
    , cartaoVermelhoAtletaField: document.querySelector('#cartao-vermelho-atleta')
    , minutosJogadosAtletaField: document.querySelector('#minutosjogados-atleta')
    , listaReportSpan: document.querySelector('#lista-report')
    , tableDadosClube: document.querySelector('#table-dados-clubes')
    , btnExport: document.querySelector('#btnExport')
    , labelExport: document.querySelector('#label-export')
    , atletaAtual: -1
    , clubeAtual: -1
    , fotoAtletaField: document.querySelector('#foto-atleta')
    , nomeAtletaField: document.querySelector('#nome-atleta')
    , apelidoAtletaField: document.querySelector('#apelido-atleta')
    , categoriaAtletaField: document.querySelector('#categoria-atleta')
    , posicaoAtletaField: document.querySelector('#posicao-atleta')
    , idadeAtletaField: document.querySelector('#idade-atleta')
    , cidadeAtletaField: document.querySelector('#cidade-atleta')
    , paisAtletaField: document.querySelector('#pais-atleta')
    , jogosAtletaField: document.querySelector('#jogos-atleta')
    , golsPorJogoField: document.querySelector('#gols-por-jogo')
    , assistenciaPorJogoField: document.querySelector('#assistencia-por-jogo')
    , cAmareloPorJogoField: document.querySelector('#cartaoamarelo-por-jogo')
    , cVermelhoPorJogoField: document.querySelector('#cartaovermelho-por-jogo')
    , dadosPorJogo: []
    , analiseAtletaBtn: document.querySelector('#btn-export-analise')
    , analiseAtletaField: document.querySelector('#analise-field')
    , analiseAdicionada: 0
}
pageRelatorio.btnExport.addEventListener('click', function () {
    if (pageRelatorio.labelExport.innerHTML == 'Exportar Jogos') {
        exportRelatorioClube();
    }
    else {
        adicionarAnalise();
    }
})
pageRelatorio.reportAtleta.addEventListener('click', function () {
    $(pageRelatorio.divEstatisticasClube).hide();
    $(pageRelatorio.divEstatisticasAtleta).hide();
    $(pageRelatorio.tableDadosClube).hide();
    pageRelatorio.listaReportSpan.innerHTML = 'Lista de Atletas';
    pageRelatorio.bodyDadosClubes.innerHTML = '';
    pageRelatorio.bodyDadosAtletas.innerHTML = '';
    pageRelatorio.labelExport.innerHTML = 'Exportar Dados';
    pageRelatorio.dataInicioField.value = '';
    pageRelatorio.dataFimField.value = '';
    pageRelatorio.atletaAtual = 1;
    pageRelatorio.clubeAtual = 0;
    getClubesCombo();
    getJogos();
})
pageRelatorio.reportClube.addEventListener('click', function () {
    $(pageRelatorio.divEstatisticasClube).hide();
    $(pageRelatorio.divEstatisticasAtleta).hide();
    $(pageRelatorio.tableDadosClube).show();
    pageRelatorio.listaReportSpan.innerHTML = 'Lista de Jogos';
    pageRelatorio.bodyDadosClubes.innerHTML = '';
    pageRelatorio.labelExport.innerHTML = 'Exportar Jogos';
    pageRelatorio.dataInicioField.value = '';
    pageRelatorio.dataFimField.value = '';
    pageRelatorio.atletaAtual = 0;
    pageRelatorio.clubeAtual = 1;
    getClubesAtt();
    getClubesCombo();
    getJogos();
})
pageRelatorio.searchBtn.addEventListener('click', function () {
    pageRelatorio.golsPro = 0;
    pageRelatorio.golsContra = 0;
    pageRelatorio.vitorias = 0;
    pageRelatorio.derrotas = 0;
    pageRelatorio.empates = 0;
    pageRelatorio.golAtleta = 0;
    pageRelatorio.assistenciaAtleta = 0;
    pageRelatorio.cartaoAmareloAtleta = 0;
    pageRelatorio.cartaoVermelhoAtleta = 0;
    pageRelatorio.minutosJogadosAtleta = 0;
    pageRelatorio.jogosAtleta = 0;
    var clubeSelecionado = $(pageRelatorio.clubeField).val();
    getDadosClube(clubeSelecionado);
    var atletaSelecionado = $(pageRelatorio.atletaField).val();
    var tempDados = {
        golsPro: pageRelatorio.golsPro
        , golsContra: pageRelatorio.golsContra
        , vitorias: pageRelatorio.vitorias
        , derrotas: pageRelatorio.derrotas
        , empates: pageRelatorio.empates
    }
    var tempDadosAtleta = {
        gol: pageRelatorio.golAtleta
        , assistencia: pageRelatorio.assistenciaAtleta
        , cartaoAmarelo: pageRelatorio.cartaoAmareloAtleta
        , cartaoVermelho: pageRelatorio.cartaoVermelhoAtleta
        , minutosJogados: pageRelatorio.minutosJogadosAtleta
        , jogos: pageRelatorio.jogosAtleta
    }
    if (pageRelatorio.clubeAtual == 1) {
        $(pageRelatorio.divEstatisticasClube).show();
        getEstatisticasClube(tempDados);
    }
    else {
        if (atletaSelecionado == "-") {
            swal("", "Selecione um atleta!", "error");
        }
        else {
            $(pageRelatorio.divEstatisticasAtleta).show();
            getEstatisticasAtleta(atletaSelecionado);
        }
        getDadosAtleta();
        preencheEstatisticasAtleta(tempDadosAtleta);
    }
})

function getDadosAtleta() {
    atletaAtual = pageAtleta.atletas[pageRelatorio.atletaField.value];
    if (atletaAtual == undefined) {
        atletaAtual = "";
    }
    else {
        $(pageRelatorio.divEstatisticasAtleta).show();
        if (atletaAtual.foto) {
            var htmlFoto = '<img width="240" height="240" src="' + atletaAtual.foto + '"/>';
        }
        else {
            var htmlFoto = '<img width="240" height="240" src="img/sem_foto.png"/>';
        }
        pageRelatorio.fotoAtletaField.innerHTML = htmlFoto;
        pageRelatorio.nomeAtletaField.innerHTML = '<b>' + atletaAtual.nome + '</b>';
        pageRelatorio.apelidoAtletaField.innerHTML = '<b>' + atletaAtual.apelido + '</b>';
        pageRelatorio.categoriaAtletaField.innerHTML = '<b>' + atletaAtual.categoria + '</b>';
        pageRelatorio.posicaoAtletaField.innerHTML = '<b>' + atletaAtual.posicao + '</b>';
        pageRelatorio.idadeAtletaField.innerHTML = '<b>' + atletaAtual.idade + '</b>';
        pageRelatorio.cidadeAtletaField.innerHTML = '<b>' + atletaAtual.cidade + '</b>';
        pageRelatorio.paisAtletaField.innerHTML = '<b>' + atletaAtual.pais + '</b>';
    }
}

function getEstatisticasAtleta(idAtleta) {
    atletaSel = pageAtleta.atletas[idAtleta];
    tempJogos = pageJogo.jogos;
    pageRelatorio.bodyDadosAtletasJogo.innerHTML = '';
    var dataInicio = $(pageRelatorio.dataInicioField).val().split("/");
    var dataInicioFormat = new Date(dataInicio[2], dataInicio[1] - 1, dataInicio[0]);
    var dataFim = $(pageRelatorio.dataFimField).val().split("/");
    var dataFimFormat = new Date(dataFim[2], dataFim[1] - 1, dataFim[0]);
    var jogos = [];
    if (dataInicioFormat > dataFimFormat) {
        swal("", "A data final não pode ser menor que a inicial", "error");
    }
    else {
        for (var key in tempJogos) {
            jogos = tempJogos[key].atletasTempJogo;
            var dataJogo = tempJogosClube[key].data.split("/");
            var dataJogoFormat = new Date(dataJogo[2], dataJogo[1] - 1, dataJogo[0]);
            for (var id in jogos) {
                if ((dataJogoFormat >= dataInicioFormat && dataJogoFormat <= dataFimFormat) || dataInicio == '' && dataFim == '') {
                    if (atletaSel.uid == jogos[id].uid) {
                        var html = '';
                        html += '<tr>'
                        html += '<td class="meuClube">' + pageClube.clubes[tempJogos[key].meuclube].nomeclube + '</a></td>';
                        html += '<td class="placar">' + tempJogos[key].golsmeuclube + "x" + tempJogos[key].golsclubeadversario + '</td>';
                        html += '<td class="clubeAdversario">' + pageClube.clubes[tempJogos[key].clubeadversario].nomeclube + '</td>';
                        html += '<td class="dataJogo">' + tempJogos[key].data + '</td>';
                        html += '<td class="golsNoJogo">' + jogos[id].gol + '</td>';
                        html += '<td class="assistNoJogo">' + jogos[id].assistencia + '</td>';
                        html += '<td class="cAmareloNoJogo">' + jogos[id].cartaoamarelo + '</td>';
                        html += '<td class="cVermelhoNoJogo">' + jogos[id].cartaovermelho + '</td>';
                        html += '<td class="minutosJogadosNoJogo">' + jogos[id].minutosjogados + '</td>';
                        html += '</tr>';
                        $('#body-dados-atleta-jogo').append(html);
                        pageRelatorio.golAtleta += parseInt(jogos[id].gol);
                        pageRelatorio.assistenciaAtleta += parseInt(jogos[id].assistencia);
                        pageRelatorio.cartaoAmareloAtleta += parseInt(jogos[id].cartaoamarelo);
                        pageRelatorio.cartaoVermelhoAtleta += parseInt(jogos[id].cartaovermelho);
                        pageRelatorio.minutosJogadosAtleta += parseInt(jogos[id].minutosjogados);
                        pageRelatorio.jogosAtleta++;
                    }
                }
            }
        }
    }
}

function preencheEstatisticasAtleta(tempDadosAtleta) {
    dadosPorJogo = {
            golsPorJogo: (pageRelatorio.golAtleta / pageRelatorio.jogosAtleta).toFixed(2)
            , assistenciasPorJogo: (pageRelatorio.assistenciaAtleta / pageRelatorio.jogosAtleta).toFixed(2)
            , cAmareloPorJogo: (pageRelatorio.cartaoAmareloAtleta / pageRelatorio.jogosAtleta).toFixed(2)
            , cVermelhoPorJogo: (pageRelatorio.cartaoVermelhoAtleta / pageRelatorio.jogosAtleta).toFixed(2)
        }
        //var golsPorJogo = (pageRelatorio.golAtleta / pageRelatorio.jogosAtleta).toFixed(2);
        //var assistenciasPorJogo = (pageRelatorio.assistenciaAtleta / pageRelatorio.jogosAtleta).toFixed(2);
        //var cAmareloPorJogo = (pageRelatorio.cartaoAmareloAtleta / pageRelatorio.jogosAtleta).toFixed(2);
        //var cVermelhoPorJogo = (pageRelatorio.cartaoVermelhoAtleta / pageRelatorio.jogosAtleta).toFixed(2);
    if (dadosPorJogo.golsPorJogo == "NaN") {
        dadosPorJogo.golsPorJogo = 0;
    }
    if (dadosPorJogo.assistenciasPorJogo == "NaN") {
        dadosPorJogo.assistenciasPorJogo = 0;
    }
    if (dadosPorJogo.cAmareloPorJogo == "NaN") {
        dadosPorJogo.cAmareloPorJogo = 0;
    }
    if (dadosPorJogo.cVermelhoPorJogo == "NaN") {
        dadosPorJogo.cVermelhoPorJogo = 0;
    }
    pageRelatorio.golAtletaField.innerHTML = '<b>' + pageRelatorio.golAtleta + '</b>';
    pageRelatorio.assistenciaAtletaField.innerHTML = '<b>' + pageRelatorio.assistenciaAtleta + '</b>';
    pageRelatorio.cartaoAmareloAtletaField.innerHTML = '<b>' + pageRelatorio.cartaoAmareloAtleta + '</b>';
    pageRelatorio.cartaoVermelhoAtletaField.innerHTML = '<b>' + pageRelatorio.cartaoVermelhoAtleta + '</b>';
    pageRelatorio.minutosJogadosAtletaField.innerHTML = '<b>' + pageRelatorio.minutosJogadosAtleta + '</b>';
    pageRelatorio.jogosAtletaField.innerHTML = '<b>' + pageRelatorio.jogosAtleta + '</b>';
    pageRelatorio.golsPorJogoField.innerHTML = '<b>' + dadosPorJogo.golsPorJogo + '</b>'
    pageRelatorio.assistenciaPorJogoField.innerHTML = '<b>' + dadosPorJogo.assistenciasPorJogo + '</b>'
    pageRelatorio.cAmareloPorJogoField.innerHTML = '<b>' + dadosPorJogo.cAmareloPorJogo + '</b>'
    pageRelatorio.cVermelhoPorJogoField.innerHTML = '<b>' + dadosPorJogo.cVermelhoPorJogo + '</b>'
}

function showClube() {
    var clube1 = $(pageRelatorio.clubeField).val();
    getAtletasCombo(clube1);
}
$(pageRelatorio.clubeField).change(showClube);

function getAtletasCombo(tempClube) {
    $(pageRelatorio.atletaField).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.atletaField.options.add(newOption);
    var tempAtletasClube = [];
    tempAtleta = pageAtleta.atletas;
    for (var key in tempAtleta) {
        if (tempAtleta[key].clube == tempClube) {
            preencheComboAtletaReport(tempAtleta[key]);
        }
    }
    $(pageRelatorio.atletaField).material_select();
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
    html += '<td class="meuClube">' + pageClube.clubes[dadosClube.meuclube].nomeclube + '</a></td>';
    html += '<td class="placar">' + dadosClube.golsmeuclube + "x" + dadosClube.golsclubeadversario + '</td>';
    html += '<td class="clubeAdversario">' + pageClube.clubes[dadosClube.clubeadversario].nomeclube + '</td>';
    html += '<td class="localJogo">' + dadosClube.local + '</td>';
    html += '<td class="dataJogo">' + dadosClube.data + '</td>';
    html += '</tr>';
    $('#body-dados-clube').append(html);
}

function getClubesCombo() {
    $(pageRelatorio.clubeField).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.clubeField.options.add(newOption);
    var tempClube = [];
    tempClube = pageClube.clubes;
    for (var key in tempClube) {
        preencheComboClubeReport(tempClube[key]);
    }
    if (pageRelatorio.atletaAtual == 1) {
        getAtletasCombo();
    }
}

function preencheComboClubeReport(tempClube) {
    var newOption = document.createElement("option");
    newOption.value = tempClube.uid;
    newOption.innerHTML = tempClube.nomeclube;
    pageRelatorio.clubeField.options.add(newOption);
    $(pageRelatorio.clubeField).material_select();
}

function exportRelatorioClube() {
    pageRelatorio.bodyDadosClubes.innerHTML == '';
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
        else { //other browser not tested on IE 11
            sa = ('data:application/vnd.ms-excel,' + escape(tab_text));
        }
        var a = document.createElement('a');
        var data_type = sa;
        a.href = data_type;
        a.download = pageClube.clubes[pageRelatorio.clubeField.value].nomeclube + '.xls';
        a.click();
        return (a);
    }
}

function adicionarAnalise(){
    $('#modal-analise').modal('open');
    pageRelatorio.analiseAtletaField.value = '';
    pageRelatorio.analiseAtletaBtn.addEventListener('click', function(){
        pageRelatorio.analiseAdicionada = pageRelatorio.analiseAtletaField.value;
        exportRelatorioAtleta();
    });
    
}
function exportRelatorioAtleta() {
    pageRelatorio.bodyDadosAtletas.innerHTML = '';
    if (pageRelatorio.atletaField.value == '-') {
        swal("", "Selecione uma opção!", "error");
    }
    else {
        atletaSel = pageAtleta.atletas[pageRelatorio.atletaField.value];
        var html = '<tr>';
        html += '<td class="nomeAtleta">' + atletaSel.nome + '</td>';
        html += '<td class="minutosJogadosAtleta">' + pageRelatorio.minutosJogadosAtleta + '</td>';
        html += '<td class="golsAtleta">' + pageRelatorio.golAtleta + '</td>';
        html += '<td class="assistAtleta">' + pageRelatorio.assistenciaAtleta + '</td>';
        html += '<td class="cAmareloAtleta">' + pageRelatorio.cartaoAmareloAtleta + '</td>';
        html += '<td class="cVermelhoAtleta">' + pageRelatorio.cartaoVermelhoAtleta + '</td>';
        html += '<td class="golsPorJogoAtleta">' + dadosPorJogo.golsPorJogo + '</td>';
        html += '<td class="assistenciasPorJogoAtleta">' + dadosPorJogo.assistenciasPorJogo + '</td>';
        html += '<td class="cAmareloPorJogoAtleta">' + dadosPorJogo.cAmareloPorJogo + '</td>';
        html += '<td class="cVermelhoPorJogoAtleta">' + dadosPorJogo.cVermelhoPorJogo + '</td>';
        html += '</tr>';
        $('#body-dados-atleta').append(html);
        var tab_text = "<table border='2px'>";
        //tab_text += "<tr><th>Nome</th><th>Minutos Jogados</th><th>Gols</th><th>Assistências</th><th>Cartão Amarelo</th><th>Cartão Vermelho</th><th>Gols Por Jogo</th><th>Assistências Por Jogo</th><th>Cartão Amarelo Por Jogo</th><th>Cartão Vermelho Por Jogo</th></tr><tr>";
        tab = pageRelatorio.bodyDadosAtletasJogo; // id of table
        tab2 = pageRelatorio.bodyDadosAtletas;
        tab_text += '<tr><th>Nome</th><th>Minutos Jogados</th><th>Gols</th><th>Assistências</th><th>Cartão Amarelo</th><th>Cartão Vermelho</th><th>Gols Por Jogo</th><th>Assistências Por Jogo</th><th>Cartão Amarelo Por Jogo</th><th>Cartão Vermelho Por Jogo</th></tr>';
        tab_text = tab_text + tab2.innerHTML + "</tr>";
        tab_text += '<tr></tr>';
        tab_text += "<tr><th>Clube</th><th>Placar</th><th>Adversário</th><th>Data</th><th>Gols</th><th>Assistências</th><th>Cartão Amarelo</th><th>Cartão Vermelho</th><th>Minutos Jogados</th></tr><tr>";
        var textRange;
        var j = 0;
        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        }
        tab_text = tab_text + "</table>";
        tab_text += "<table border='2px'>";
        tab_text += '<tr></tr>';
        tab_text += '<tr><th>Análise</th></tr>';
        tab_text += '<th style="font-weight:normal">'+pageRelatorio.analiseAdicionada+'</th>';
        tab_text += "</table>";
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
        else { //other browser not tested on IE 11
            if (atletaSel.foto) {
                sa = ('data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$=div-foto-atleta]').html()) + escape(tab_text));
            }
            else {
                sa = ('data:application/vnd.ms-excel,' + escape(tab_text));
            }
        }
        var a = document.createElement('a');
        var data_type = sa;
        a.href = data_type;
        a.download = pageAtleta.atletas[pageRelatorio.atletaField.value].nome + "_" + pageClube.clubes[pageAtleta.atletas[pageRelatorio.atletaField.value].clube].nomeclube + '.xls';
        a.click();
        return (a);
    }
}

//EXPORT EM PDF
//pageRelatorio.btnExportPdf.addEventListener("click", function () {
//    pageRelatorio.bodyDadosAtletas.innerHTML = '';
//    if (pageRelatorio.atletaField.value == '-') {
//        swal("", "Selecione uma opção!", "error");
//    }
//    else {
//        atletaSel = pageAtleta.atletas[pageRelatorio.atletaField.value];
//        var doc = new jsPDF('p', 'pt', 'letter')
//            , source = $('#div-estatistica-atleta')[0]
//            , margins = {
//                top: 0
//                , bottom: 0
//                , left: 0
//                , right: 0
//                , width: 522
//            };
//        doc.fromHTML(
//        source,
//        margins.left,
//        margins.top,
//        {
//        'width': margins.width 
//        },
//        function (dispose) {
//            doc.save('Test.pdf');
//        },
//        margins
//   );
//            //doc.save(atletaSel.nome + '_' + pageClube.clubes[pageAtleta.atletas[pageRelatorio.atletaField.value].clube].nomeclube + '.pdf');
//    }
//});

pageRelatorio.limparBtn.addEventListener('click', function () {
    $(pageRelatorio.clubeField).val("-");
    $(pageRelatorio.clubeField).material_select();
    $(pageRelatorio.atletaField).val("-");
    $(pageRelatorio.atletaField).material_select();
    if (pageRelatorio.clubeAtual == 1) {
        $(pageRelatorio.divEstatisticasClube).hide();
        var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
        jogosNaTela.forEach(function (jogosHtml) {
            pageRelatorio.bodyDadosClubes.innerHTML = '';
        });
        pageRelatorio.dataInicioField.value = '';
        pageRelatorio.dataFimField.value = '';
    }
    else if (pageRelatorio.atletaAtual == 1) {
        pageRelatorio.dataInicioField.value = '';
        pageRelatorio.dataFimField.value = '';
        $(pageRelatorio.clubeField).val("-");
        $(pageRelatorio.divEstatisticasAtleta).hide();
    }
})