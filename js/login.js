const elLoginForm = document.querySelector(".js-login-form");
const elLoginInput = document.querySelector(".js-login-input");
const elPasswordInput = document.querySelector(".js-password-input");

const API_PATH = "http://192.168.1.5:5000/";

async function loginUser() {
    try {
        const res = await fetch(API_PATH + "user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: elLoginInput.value,
                password: elPasswordInput.value,
            })
        });
        const data = await res.json();
        console.log(data);
        if(data.token){
            localStorage.setItem("loginToken", data.token);
            // window.location.replace("/");
        }
    } catch (error) {
        console.log(error.message);
    }
}

elLoginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    loginUser()
})

