var pageBtn = {
    dashboardSideBtn: document.querySelector('#dashboard-menu')
    , atletasSideBtn: document.querySelector('#atletas-menu')
    , clubesSideBtn: document.querySelector('#clubes-menu')
    , relatoriosSideBtn: document.querySelector('#relatorios-menu')
    , logoutBtn: document.querySelector('#btn-logout')
}

window.addEventListener('load', function () {
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
    //user.reauthenticate(credential).then(function(){
        if (!user) {
        window.location = '/index.html';
    }    
});
});

pageBtn.logoutBtn.addEventListener('click', function () {
    swal({
        title: "Deseja sair?"
        , type: "warning"
        , showCancelButton: true
        , cancelButtonText: "Cancelar"
        , confirmButtonText: "Sim, desejo sair"
        , closeOnConfirm: false
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
    swal("Ops...", "Menu de Relatórios em desenvolvimento");
});

    $(pageBtn.atletasSideBtn).click(function () {
        $('#view-atletas').toggle();
    });


    $('#clubes-menu').click(function () {
        $('#view-clubes').toggle();
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
    });

    $(pageBtn.atletasSideBtn).click(function () {
        //getAtletas();
        $('.view-atletas').show();
        $('.view-clubes').hide();
        $('.dash').hide();
    });


    $(pageBtn.clubesSideBtn).click(function () {
        $('.view-clubes').show();
        $('.view-atletas').hide();
        $('.dash').hide();
    });
});
