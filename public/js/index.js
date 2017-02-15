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
        return usuario;
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
    var emailAddress = page.resetEmailField.value;

    if(page.resetEmailField.value.length < 3)
        alert("Por favor, digite um e-mail válido");
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function(){
        alert("O e-mail foi enviado para " + page.resetEmailField.value);
    }, function(error){
        var errorEmail = erro.message;
        alert(errorEmail);
    });
});

//Press enter to Login
page.emailField.addEventListener('keyup', function(event){
   event.preventDefault();
    if(event.keyCode == 13)
        page.loginBtn.click();
});

//Press enter to Send email
page.resetEmailField.addEventListener('keyup', function(event){
    event.preventDefault();
    if(event.keyCode == 13)
        page.resetBtn.click();
});
