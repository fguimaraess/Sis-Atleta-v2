var page = {
   database: firebase.database()
}

function getAtletas() {
    page.database.ref('/atletas').once('value').then(function (snapshot) {
        snapshot.val().forEach(function (atletas)) {
            //Trazer lista de atletas
        }
    });
}

function novoAtleta() {
        
        
    }