var pageBtn = {
    atletasSideBtn: document.querySelector('#atletas-menu')
    , clubesSideBtn: document.querySelector('#clubes-menu')
    , relatoriosSideBtn: document.querySelector('#relatorios-menu')
}
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
$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});
$(document).ready(function () {
    $('select').material_select();
});
$(document).ready(function () {
    Materialize.updateTextFields();
});

$(document).ready(function () {
   $(pageBtn.atletasSideBtn).click(function(){
   $('.view-atletas').toggle();
   $('.view-clubes').hide();
       $('.dash').hide();
});
});

$(document).ready(function () {
  $(pageBtn.clubesSideBtn).click(function(){
   $('.view-clubes').toggle();
      $('.view-atletas').hide();
      $('.dash').hide();
});
});



