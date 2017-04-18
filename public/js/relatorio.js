var pageRelatorio = {
    reportAtleta: document.querySelector('#report-atleta'),
    reportClube: document.querySelector('#report-clube'),
    atletaField: document.querySelector('#report-atleta-combo'),
    clubeField: document.querySelector('#report-clube-combo'),
    dataInicioField: document.querySelector('#data-inicio-field'),
    dataFimField: document.querySelector('#data-fim-field'),
    searchBtn: document.querySelector('#search-btn'),
    bodyDadosClubes: document.querySelector('#body-dados-clube'),
    limparBtn: document.querySelector('#limpar-relatorio')
}

pageRelatorio.reportAtleta.addEventListener('click', function(){
    getClubesReport();
    getJogos();
})

pageRelatorio.reportClube.addEventListener('click', function(){
    getClubesReport();
    getJogos();
})

pageRelatorio.searchBtn.addEventListener('click', function(){
    var clubeSelecionado = $(pageRelatorio.clubeField).val();
    getDadosClube(clubeSelecionado);
})

function getDadosClube(tempClube)
{
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function(jogosHtml){
            pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
    
    tempJogosClube = pageJogo.jogos;
    var dadosClube = [];
    var trocaDados = [];
    dadosClube.totalGols = 0;
    for (var key in tempJogosClube){
        if (tempClube == tempJogosClube[key].meuclube){
            dadosClube = tempJogosClube[key];
            preencheReportClube(dadosClube);
        }
    if(tempClube == tempJogosClube[key].clubeadversario){
        trocaDados.meuclube = tempJogosClube[key].clubeadversario;
        trocaDados.golsmeuclube = tempJogosClube[key].golsclubeadversario;
        trocaDados.clubeadversario = tempJogosClube[key].meuclube;
        trocaDados.golsclubeadversario = tempJogosClube[key].golsmeuclube;
        trocaDados.local = tempJogosClube[key].local;
        trocaDados.data = tempJogosClube[key].data;
        trocaDados.uid = tempJogosClube[key].uid;
        preencheReportClube(trocaDados);
        console.log(trocaDados);
        console.log(tempJogosClube[key])
    }
    }
}

function preencheReportClube(tempJogosClube){
    
    
    var dadosClube = tempJogosClube;
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

function getClubesReport(){
    $(pageRelatorio.clubeField).empty();
    var newOption = document.createElement("option");
    newOption.value = "Sem Clube";
    newOption.innerHTML = "Sem Clube";
    pageRelatorio.clubeField.options.add(newOption);
    var tempClube = [];
    tempClube = pageClube.clubes;
    for(var key in tempClube){
        preencheComboClubeReport(tempClube[key]);
    }
    
}

function preencheComboClubeReport(tempClube){
    //console.log(tempClube)
    var newOption = document.createElement("option");
    newOption.value = tempClube.nomeclube;
    newOption.innerHTML = tempClube.nomeclube;
    pageRelatorio.clubeField.options.add(newOption);

    $(pageRelatorio.clubeField).material_select();
}

pageRelatorio.limparBtn.addEventListener('click', function(){
    var jogosNaTela = document.querySelectorAll('.idDosJogosFiltrados');
    jogosNaTela.forEach(function(jogosHtml){
            pageRelatorio.bodyDadosClubes.innerHTML = '';
    });
})