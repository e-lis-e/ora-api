const password = document.getElementById('password');
const icon = document.getElementById('icon');

function ligadaDesligada(){
    if(password.type === 'password'){
        password.setAttribute('type', 'text');
        icon.classList.add('desligado')
    } else{
        password.setAttribute('type','password');
        icon.classList.remove('desligado')
    }
}