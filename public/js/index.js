var page = {
  loginBtn: document.querySelector('#login-btn'),
  registerBtn: document.querySelector('#register-btn'),
  database: firebase.database()
}

page.loginBtn.addEventListener('click', function() {

  console.log(getUsuario('luizcunha3@gmail.com'));

});

page.registerBtn.addEventListener('click', function() {
  window.location = "/register.html";
});

function getUsuario(email) {

  console.log('entrei no get usuarios');

  page.database.ref('/usuarios').once('value').then(function(snapshot) {
    var usuarioDatabase = false;
    snapshot.val().forEach(function(usuario) {

      if (usuario.email == email) {
        usuarioDatabase = usuario;
      }

    });
    return usuarioDatabase;

  })

}
