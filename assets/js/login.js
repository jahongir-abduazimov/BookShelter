"use strict";

let loginForm = $('#login-form'),
    userName = $('#user'),
    password = $('#password')


let baseURL = 'https://fakestoreapi.com/auth/login'

async function authoration() {
    let user = {
        username: userName.value,
        password: password.value
    }

    try {
        if (user.password.trim().length == 0 || user.username.trim().length == 0) {
            alert("Iltimos formani to'ldiring")
        } else {
            let response = await fetch(`${baseURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let result = await response.json()
            localStorage.setItem('token', result.token)

            if (localStorage.getItem('token',)) {
                window.location.href = "../../index.html"
            }
        }
    } catch (err) {
        console.log(err);
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    authoration()
})