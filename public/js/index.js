var page = {
  loginBtn: document.querySelector('#login-btn'),
  registerBtn: document.querySelector('#register-btn'),
  resetBtn: document.querySelector('#reset-btn'),
  resetEmailField: document.querySelector('#resetemail-field'),
  emailField: document.querySelector('#email-field'),
  passwordField: document.querySelector('#password-field'),
  database: firebase.database()
}

page.loginBtn.addEventListener('click', function() {


  var user = firebase.auth().signInWithEmailAndPassword(page.emailField.value, page.passwordField.value)
    .then(function(){
      window.location = "/dashboard.html";
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    var user = firebase.auth().currentUser;
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

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

page.resetBtn.addEventListener('click', function(){
    var auth = firebase.auth();
    var emailAddress = page.resetEmailField.value;
    
    auth.sendPasswordResetEmail(emailAddress).then(function(){
        alert("Email enviado");
    }, function(error){
        var errorEmail = erro.message;
        alert(errorEmail);
    });
});
