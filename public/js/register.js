//DOM elements
const $loginButton = document.querySelector("#login-button")
const $registerForm = document.querySelector("#register-form")
const $usernameInput = document.querySelector("#username-input")
const $nameInput = document.querySelector("#name-input")
const $surnameInput = document.querySelector("#surname-input")
const $emailInput = document.querySelector("#email-input")
const $passwordInput = document.querySelector("#password-input")
const $submitButton = document.querySelector("#submit-button")
const $results = document.querySelector("#results")
const xhr = new XMLHttpRequest()

window.onload = () => {
    $loginButton.addEventListener("click", () => {
        location.href = "/"
    })
    
    $registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        xhr.open("POST", "/user/register")
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

        xhr.send(JSON.stringify({
            username: $usernameInput.value,
            name: $nameInput.value,
            surname: $surnameInput.value,
            email: $emailInput.value,
            password: $passwordInput.value,
        }))
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201) {
                    return $results.innerHTML = "Your account has successfully created!"
                }
                else if (xhr.status === 400){
                    return $results.innerHTML = "Account could not created. Please try again!"
                }
                else{
                    return $results.innerHTML = "Something unexpected happened. Please try again later!"
                }
            }
          }
    
    })
}
