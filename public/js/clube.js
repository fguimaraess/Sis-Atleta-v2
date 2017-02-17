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
    novoClube(clube);
    alert("Clube cadastro com sucesso!");
}

function novoClube(clube) {
    page.database.ref(page.databaseRef).push(clube);
}