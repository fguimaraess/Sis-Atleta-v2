var page = {
  nameField: document.querySelector('#name-field'),
  emailField: document.querySelector('#email-field'),
  cidadeField: document.querySelector('#cidade-field'),
  estadoField: document.querySelector('#estado-field'),
  senhaField: document.querySelector('#password-field'),
  senhaCheckField: document.querySelector('#verify-pwd-field'),
  registrarBtn: document.querySelector('#cadastrar-btn'),
  voltarBtn: document.querySelector('#voltar-btn'),
  database: firebase.database()
}

function checkSenha(){
  return page.senhaField.value == page.senhaCheckField.value;
}

function saveUserDetails(usuario){
  console.log('nome: ', page.nameField.value);
  console.log('cidade: ', page.cidadeField.value);
  console.log('estado: ', page.estadoField.selectedIndex);
  firebase.database().ref('users/' + usuario.uid).set({
    username: page.nameField.value,
    email: page.emailField.value,
    cidade: page.cidadeField.value,
    estado: page.estadoField.value
  });
}



function handleCadastroErro(error){
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    swal('The password is too weak.');
  } else {
    swal(errorMessage);
  }
  console.log(error);
}

function registraUsuario() {
  if(checkSenha()){
    firebase.auth().createUserWithEmailAndPassword(page.emailField.value, page.senhaField.value)
      .then(function(user){
        saveUserDetails(user);
      })
      .then(function () {
        window.location = '/dashboard.html';
      })
      .catch(function(error) {
        handleCadastroErro(error);
      });
  } else {
    console.log('senhas diferentes');
  }

}

page.voltarBtn.addEventListener('click', function() {
  window.location = '/';
});

page.registrarBtn.addEventListener('click', registraUsuario);


$(document).ready(function() {
  $('select').material_select();
});
