var page = {
  loginBtn: document.querySelector('#login-btn'),
  registerBtn: document.querySelector('#register-btn')
}

page.registerBtn.addEventListener('click', function () {
  window.location = "/register.html";
});
