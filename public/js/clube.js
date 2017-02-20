var pageClube = {
    database: firebase.database()
    , databaseRef: '/clubes/'
    , nomeClubeField: document.querySelector('#nome-clube-field')
    , siglaClubeField: document.querySelector('#sigla-clube-field')
    , salvarBtn: document.querySelector('#salvar-clube-btn')
}
pageClube.salvarBtn.addEventListener('click', criarClube);

function criarClube() {
    var clube = {
        nomeclube: pageClube.nomeClubeField.value
        , siglaclube: pageClube.siglaClubeField.value
    }
    if (pageClube.nomeClubeField.value.length == "" || pageClube.siglaClubeField.value.length == "") {
        swal("Aviso!", "O nome e a sigla devem ser preenchidos!");
    }
    else {
        novoClube(clube);
    }
}

function novoClube(clube) {
    pageClube.database.ref(pageClube.databaseRef).push(clube).then(function () {
        swal("Clube cadastrado com sucesso!", "O clube " + pageClube.nomeClubeField.value + " foi adicionado.", "success");
    }).catch(function (error) {
        swal("Erro...", "O clube " + pageClube.nomeClubeField.value + " não foi adicionado.", "error");
    });
}