
//DOM elements
const $registerButton = document.querySelector("#register-button")
const $loginForm = document.querySelector("#login-form")
const $emailInput = document.querySelector("#email-input")
const $passwordInput = document.querySelector("#password-input")
const $results = document.querySelector("#results")


$registerButton.addEventListener("click", () => {
    location.href = "register"
})

$loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/user/login")
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    xhr.send(JSON.stringify({
        email: $emailInput.value,
        password: $passwordInput.value,
    }))

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                $results.style.color = "green"
                return $results.innerHTML = "Successfully logged in!"
            }
            else if (xhr.status === 400) {
                $results.style.color = "red"
                return $results.innerHTML = "Your email or password is incorrect. Please try again!"
            } else{
                $results.style.color = "black"
                return $results.innerHTML = "Something unexpected happened. Please try again later!"
            }
        }
    }

})
