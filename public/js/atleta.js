var page = {
    database: firebase.database()
    , databaseRef: '/atletas/'
    , linhasAtleta: 'a', //VER C LUIZ
    templateLinha: 'b', //VER C LUIZ
    nomeField: document.querySelector('#nomeatleta-field')
    , sobrenomeField: document.querySelector('#sobrenomeatleta-field')
    , posicaoField: document.querySelector('#posicaoatleta-field')
    , idadeField: document.querySelector('#idadeatleta-field')
    , categoriaField: document.querySelector('#categoriaatleta-field')
    , clubeField: document.querySelector('#clubeatleta-field')
    , cidadeField: document.querySelector('#cidadeatleta-field')
    , paisField: document.querySelector('#paisatleta-field')
    , fotoField: document.querySelector('#fotoatleta-field')
    , atletaBtn: document.querySelector('#salvar-atleta-btn')
    , dashboardAtleta: document.querySelector('#atletas-menu')
}

function novoAtleta(atleta) {
    page.database.ref(page.databaseRef).push(atleta);
}
//OK
function criaAtleta() {
    var atleta = {
        nome: page.nomeField.value
        , sobrenome: page.sobrenomeField.value
        , posicao: page.posicaoField.value
        , idade: page.idadeField.value
        , categoria: page.categoriaField.value
        , clube: page.clubeField.value
        , cidade: page.cidadeField.value
        , pais: page.paisField.value
        , foto: page.fotoField.value
    }
    novoAtleta(atleta);
}
page.atletaBtn.addEventListener('click', criaAtleta);
//OK
function getAtletasByNome(mozao) {
    var atletas = [];
    page.database.ref(page.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atletaRef) {
            if (mozao.nome == atletaRef.val().nome) {
                var tempAtleta = atletaRef.val();
                tempAtleta.uid = atletaRef.key;
                atletas.push(tempAtleta);
            }
        });
        console.log(atletas);
    });
}
//OK
function getAtletas() {
    var atletas = [];
    page.database.ref(page.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (atleta) {
            var tempAtleta = atleta.val();
            tempAtleta.uid = atleta.key;
            atletas.push(tempAtleta);
        });
        console.log(atletas);
    });
}

function preencheTabelaAtletas() {
    var atletas = getAtletas();
    linhasAtleta.innerHTML = "";
    var linhaNova;
    atletas.forEach(function (atleta) {
        linhaNova = templateLinha.cloneNode()
        linhaNova.removeHidden;
        linhaNova.querySelector('.nome-atle....').text = atleta.nome;
        /*
        depois que preencher todo mundo
        */
        linhasAtleta.addChild(linhaNova);
    });
}

function getAtletas() {
    var atletas = [];
    page.database.ref(page.databaseRef).once('value').then(function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (atleta) {
            var idAtleta = 1 //gambiarra pra pegar o id
            atleta.id = idAtleta;
            atletas.push(atleta);
        });
        return atletas;
    })
}

function getAtletasById(idAtleta) {
    return page.database.ref('/atletas/').once('value').then(function (snapshot) {
        snapshot.val().idAtleta;
    })
}

function salvaModal() {
    var atleta = {
        nome: page.nomeField.textContent
        , sobrenome: page.sobrenomeField.textContent
    };
    novoAtleta(atleta);
}

function salvaAlteracoes(atleta) {
    atleta.nome = page.nomeField.textContent;
    atleta.sobrenome = page.sobrenomeField.textContent;
    // .
    // .
    // .
    editarAtleta(atleta);
}

function editarAtleta(atleta) {
    page.database.ref().update(atleta);
}

function excluirAtleta(atleta) {
    page.database.ref('atletas/' + atleta.id).remove();
}
// page.abreListaAtleta() {
//
// }