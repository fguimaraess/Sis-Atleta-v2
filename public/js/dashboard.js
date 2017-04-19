var pageBtn = {
    dashboardSideBtn: document.querySelector('#dashboard-menu'),
    atletasSideBtn: document.querySelector('#atletas-menu'),
    clubesSideBtn: document.querySelector('#clubes-menu'),
    jogosSideBtn: document.querySelector('#jogos-menu'),
    relatoriosSideBtn: document.querySelector('#relatorios-menu'),
    logoutBtn: document.querySelector('#btn-logout'),
    addJogoBtn: document.querySelector('#addJogoBtn'),
    editarJogoBtn: document.querySelector('#editarJogo'),
    voltarJogoBtn: document.querySelector('#voltarCardJogo'),
    reportAtleta: document.querySelector('#report-atleta'),
    reportClube: document.querySelector('#report-clube'),
    voltarRelatorio: document.querySelector('#voltar-relatorio')
}
window.addEventListener('load', function () {
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        //user.reauthenticate(credential).then(function(){
        if (!user) {
            window.location = '/index.html';
        }
    });
    getAtletas();
    getClubes();
    getJogos();
});
pageBtn.logoutBtn.addEventListener('click', function () {
    swal({
        title: "Deseja sair?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, desejo sair",
        closeOnConfirm: false
    }, function () {
        //swal("", "Logout efetuado com sucesso", "success");
        firebase.auth().signOut().then(function () {
            window.location = "/index.html";
        }, function (error) {
            alert(error);
        });
    });
});
$(".dropdown-button").dropdown();
$(document).ready(function () {
    pageBtn.relatoriosSideBtn.addEventListener('click', function () {
        $('.view-relatorios').show();
        $('.relatorios-fields').hide();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
    });

    $('select').material_select();

    $('.datepicker').pickadate({
        format: 'dd/mm/yyyy',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        today: 'Hoje',
        clear: 'Apagar',
        close: 'Fechar',
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    });

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $('#posicaoatleta-field').material_select();

    $('#categoriaatleta-field').material_select();
    Materialize.updateTextFields();

    $(pageBtn.dashboardSideBtn).click(function () {
        $('.dash').show();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.view-relatorios').hide();
        $('.relatorios-fields').hide();
        $('#report-atleta-field').hide();
    });
    $(pageBtn.atletasSideBtn).click(function () {
        //getAtletas();
        $('.view-atletas').show();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
        $('.view-relatorios').hide();
        $('.relatorios-fields').hide();
        $('#report-atleta-field').hide();
    });
    $(pageBtn.clubesSideBtn).click(function () {
        getAtletas();
        $('.view-clubes').show();
        $('.view-atletas').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
        $('.view-relatorios').hide();
        $('.relatorios-fields').hide();
        $('#report-atleta-field').hide();
    });
    $(pageBtn.jogosSideBtn).click(function () {
        $('.view-jogos').show();
        $('#table-jogos').show();
        $('#addJogoBtn').show();
        $('#cardJogo').hide();
        $('#cardAtletas').hide();
        $('.view-clubes').hide();
        $('.view-atletas').hide();
        $('.dash').hide();
        $('.view-relatorios').hide();
        $('.relatorios-fields').hide();
        $('#report-atleta-field').hide();
    });
    $(pageBtn.addJogoBtn).click(function () {
        $('#cardJogo').show();
        $('#cardAtletas').show();
        $('#table-jogos').hide();
        $('#addJogoBtn').hide();
    });
    $(pageBtn.voltarJogoBtn).click(function () {
        $('.view-jogos').show();
        $('#table-jogos').show();
        $('#addJogoBtn').show();
        $('#cardJogo').hide();
        $('#cardAtletas').hide();
        $('.view-clubes').hide();
        $('.view-atletas').hide();
        $('.dash').hide();
        $('.view-relatorios').hide();
        $('.relatorios-fields').hide();
        $('#report-atleta-field').hide();
    })
    
    $(pageBtn.reportAtleta).click(function () {
        $('.relatorios-fields').show();
        $('#report-atleta-field').show();
        $('.view-relatorios').hide();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
    });
    
    $(pageBtn.reportClube).click(function () {
        $('.relatorios-fields').show();
        $('#report-atleta-field').hide();
        $('.view-relatorios').hide();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
    });
    
    $(pageBtn.voltarRelatorio).click(function(){
        $('.view-relatorios').show();
        $('.relatorios-fields').hide();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
        $('.view-jogos').hide();
        $('.dash').hide();
    });
});