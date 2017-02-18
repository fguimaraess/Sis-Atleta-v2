var page = {
    database: firebase.database()
    , databaseRef: '/clubes/'
    , nomeClubeField: document.querySelector('#nome-clube-field')
    , siglaClubeField: document.querySelector('#sigla-clube-field')
    , salvarBtn: document.querySelector('#salvar-clube-btn')
}
page.salvarBtn.addEventListener('click', criarClube);

function criarClube() {
    var clube = {
        nomeclube: page.nomeClubeField.value
        , siglaclube: page.siglaClubeField.value
    }
    if (page.nomeClubeField.value.length == "" || page.siglaClubeField.value.length == "") {
        alert("O nome e a sigla devem ser preenchidos!");
    }
    else {
        novoClube(clube);
    }
}

function novoClube(clube) {
    page.database.ref(page.databaseRef).push(clube).then(function () {
        swal("Clube cadastrado com sucesso!", "O clube " + page.nomeClubeField.value + " foi adicionado.", "success");
    }).catch(function (error) {
        swal("Erro...", "O clube " + page.nomeClubeField.value + " não foi adicionado.", "error");
    });
}