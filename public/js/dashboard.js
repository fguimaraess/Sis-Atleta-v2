var pageBtn = {
    dashboardSideBtn: document.querySelector('#dashboard-menu')
    , atletasSideBtn: document.querySelector('#atletas-menu')
    , clubesSideBtn: document.querySelector('#clubes-menu')
    , relatoriosSideBtn: document.querySelector('#relatorios-menu')
    , logoutBtn: document.querySelector('#btn-logout')
}

window.addEventListener('load', function () {
    var user = firebase.auth().currentUser;
    if (!user) {
        window.location.replace('/index.html');
    }
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
        swal("", "Logout efetuado com sucesso", "success");
        firebase.auth().signOut().then(function () {
            window.location = "/index.html";
        }, function (error) {
            alert(error);
        });
    });
})
pageBtn.relatoriosSideBtn.addEventListener('click', function () {
    swal("Ops...", "Menu de Relatórios em desenvolvimento");
})
$(document).ready(function () {
    $(pageBtn.atletasSideBtn).click(function () {
        $('#view-atletas').toggle();
    });
});
$(document).ready(function () {
    $('#clubes-menu').click(function () {
        $('#view-clubes').toggle();
    });
});
$(".dropdown-button").dropdown();
$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});
$(document).ready(function () {
    $('#posicaoatleta-field').material_select();
    $('#categoriaatleta-field').material_select();
});
$(document).ready(function () {
    Materialize.updateTextFields();
});
$(document).ready(function () {
    $(pageBtn.dashboardSideBtn).click(function () {
        $('.dash').toggle();
        $('.view-atletas').hide();
        $('.view-clubes').hide();
    });
});
$(document).ready(function () {
    $(pageBtn.atletasSideBtn).click(function () {
        $('.view-atletas').toggle();
        $('.view-clubes').hide();
        $('.dash').hide();
    });
});
$(document).ready(function () {
    $(pageBtn.clubesSideBtn).click(function () {
        $('.view-clubes').toggle();
        $('.view-atletas').hide();
        $('.dash').hide();
    });
});