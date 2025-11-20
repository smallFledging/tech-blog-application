const errorMessageLoginDiv = document.getElementById("errorMessageLogin");
const errorMessageRegisterDiv = document.getElementById("errorMessageRegister");

async function register() {
    console.log("register");
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById("password").value;
    if(emailInput === '' || passwordInput === '' || nameInput === '') {
        errorMessageRegisterDiv.textContent = "Please make sure to enter name, email and password.";
    }
    else {
        errorMessageRegisterDiv.textContent = '';
                const registerRes = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: nameInput, email: emailInput, password: passwordInput })
        });
        const data = await registerRes.json();
        if (data.success) {
            errorMessageRegisterDiv.style.color = 'blue';
            errorMessageRegisterDiv.textContent = data.message;
        } else {
            errorMessageRegisterDiv.textContent = data.message;
        }
    }
}