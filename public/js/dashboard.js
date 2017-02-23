var pageBtn = {
    atletasSideBtn: document.querySelector('#atletas-menu'),
    relatoriosSideBtn: document.querySelector('#relatorios-menu')
}

pageBtn.relatoriosSideBtn.addEventListener('click', function(){
  swal("Ops...", "Menu de Relatórios em desenvolvimento");
})

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });


$(document).ready(function() {
    $('select').material_select();
  });



//Iniciar DataTable
$(document).ready(function() {
    $('#table-clubes').DataTable({
        "language": {
            "url": "../data/PT.json"
        },
        "paging":   true,
        "ordering": false,
        "info":     false,
        "searching": false
    });
});

$(document).ready(function() {
    $('#table-jogos').DataTable({
        "language": {
            "url": "../data/PT.json"
        },
        "paging":   true,
        "ordering": false,
        "info":     false,
        "searching": false
    });
});