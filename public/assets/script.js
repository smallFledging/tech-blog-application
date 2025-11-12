const emailInput = document.getElementById('email');
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const errorMessageLoginDiv = document.getElementById("errorMessageLogin");
const errorMessageRegisterDiv = document.getElementById("errorMessageRegister");

function login() {
    console.log("login");
    if(emailInput.value === '' || passwordInput.value === '') {
        errorMessageLoginDiv.textContent = "Please make sure to enter email and password.";
    }
    else {
        errorMessageLoginDiv.textContent = ''
    }
}

function register() {
    console.log("register");
    if(emailInput.value === '' || passwordInput.value === '' || nameInput.value === '') {
        errorMessageRegisterDiv.textContent = "Please make sure to enter name, email and password.";
    }
    else {
        errorMessageRegisterDiv.textContent = '';
    }
}

function logout() {
    console.log("logout");
}