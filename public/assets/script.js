const errorMessageLoginDiv = document.getElementById("errorMessageLogin");
const errorMessageRegisterDiv = document.getElementById("errorMessageRegister");

async function login() {
    console.log("login");
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById("password").value;
    if(emailInput == '' || passwordInput == '') {
        errorMessageLoginDiv.textContent = "Please make sure to enter email and password.";
    }
    else {
        errorMessageLoginDiv.textContent = '';
        const loginRes = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailInput, password: passwordInput })
        });
        const data = await loginRes.json();

        if (data.token) {
            token = data.token;
            window.location.href = "http://localhost:3001/blog.htm";
        } else {
            alert("Login failed: " + data.message);
        }
    }
}

// function register() {
//     console.log("register");
// const nameInput = document.getElementById("name").value;
    // const emailInput = document.getElementById('email').value;
    // const passwordInput = document.getElementById("password").value;
//     if(emailInput === '' || passwordInput === '' || nameInput === '') {
//         errorMessageRegisterDiv.textContent = "Please make sure to enter name, email and password.";
//     }
//     else {
//         errorMessageRegisterDiv.textContent = '';
//     }
// }

function logout() {
    console.log("logout");
}