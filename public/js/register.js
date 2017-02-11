var page = {
  voltarBtn: document.querySelector('#voltar-btn')
}

page.voltarBtn.addEventListener('click', function () {
  window.location = '/';
});


$(document).ready(function() {
   $('select').material_select();
 });
