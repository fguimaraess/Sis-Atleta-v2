var page = {
  loginBtn: document.querySelector('#login-btn'),
  registerBtn: document.querySelector('#register-btn'),
  emailField: document.querySelector('#email-field'),
  passwordField: document.querySelector('#password-field'),
  database: firebase.database()
}

page.loginBtn.addEventListener('click', function() {


  var user = firebase.auth().signInWithEmailAndPassword(page.emailField.value, page.passwordField.value)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    var user = firebase.auth().currentUser;

    alert(user.email);
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
