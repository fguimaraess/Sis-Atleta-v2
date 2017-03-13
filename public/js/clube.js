var pageClube = {
    clubes: []
    , database: firebase.database()
    , databaseRef: '/clubes/',
    databaseAtletas: '/atletas/'
    , nomeClubeField: document.querySelector('#nome-clube-field')
    , siglaClubeField: document.querySelector('#sigla-clube-field')
    , salvarBtn: document.querySelector('#salvar-clube-btn')
}
pageClube.salvarBtn.addEventListener('click', criarClube);
window.addEventListener('load', getClubes);

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
        preencheTabelaClube(clube);
    }
}

function novoClube(clube) {
    pageClube.database.ref(pageClube.databaseRef).push(clube).then(function () {
        swal("Clube cadastrado com sucesso!", "O clube " + pageClube.nomeClubeField.value + " foi adicionado.", "success");
        $('#modal-addclube').modal('close');
    }).catch(function (error) {
        swal("Erro...", "O clube " + pageClube.nomeClubeField.value + " não foi adicionado.", "error");
    });
}

function excluirClube(idClube)
{
    pageClube.database.ref(pageClube.databaseRef + idClube).remove().then(swal("", "Clube removido com sucesso", "success"));
}

function preencheTabelaClube(tempClube) {
    var html = '';
    html += '<tr id="' + tempClube.uid + '">';
    html += '<td><a href="#">' + tempClube.nomeclube + '</a></td>';
    html += '<td>' + tempClube.siglaclube + '</td>';
    html += '<td><a onclick="getAtletasByClube(\'' + tempClube.uid + '\')" href="#" class=ver-atletas>Ver Atletas</a></td>';
    html += '<td><a onclick="abreModalClube(\'' + tempClube.uid + '\')" href="#" class="editar-jogador"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirClube(\'' + tempClube.uid + '\' )" href="#" class="excluir-jogador"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>';
    $('#body-clube').append(html);
}

function getClubes() {
    pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            pageClube.clubes[clubeRef.key] = (tempClube);
            preencheTabelaClube(tempClube);
        });
    })
}

function getAtletasByClube(idClube) {
    $('#modal-veratletas').modal('open');
    pageClube.database.ref(pageClube.databaseRef).once('value').then(function (snapshot) {
        snapshot.forEach(function (clubeRef) {
            var tempClube = clubeRef.val();
            tempClube.uid = clubeRef.key;
            if (idClube == tempClube.uid) {
                //console.log(tempClube.nomeclube);
                pageClube.database.ref(pageClube.databaseAtletas).once('value').then(function (snapshot) {
                    snapshot.forEach(function (atletaRef) {
                        var tempAtletaClube = atletaRef.val();
                        //console.log(tempAtletaClube.clube);
                        //console.log(tempClube.nomeclube);
                        if (tempClube.nomeclube == tempAtletaClube.clube) {
                            //console.log(tempAtletaClube.nome);
                            html = '';
                            html += '<tr id="' + tempAtletaClube.uid + '">';
                            html += '<td>' + tempAtletaClube.nome + '</td>';
                            html += '<td>' + tempAtletaClube.idade + '</td>';
                            html += '<td>' + tempAtletaClube.posicao + '</td>';
                            html += '<td>' + tempAtletaClube.categoria + '</td>';
                            html += '</tr>';
                            $('#body-atletas-clube').append(html);
                        }
                    });
                });
            }
        });
    });
}