
//DOM Elements
const mainTitle = document.getElementById("main-title")
const homeIcon = document.getElementById("home-icon")
const messageIcon = document.getElementById("message-icon")
const userIcon = document.getElementById("user-icon")

mainTitle.addEventListener("click", () => {
    mainTitle.style.color = "rgba(0, 0, 0, 0.5)"
    location.href = "/home"
})

homeIcon.addEventListener("click", () => {
    homeIcon.style.color = "rgba(0, 0, 0, 0.5)"
    location.href = "/home"
})

messageIcon.addEventListener("click", () => {
    messageIcon.style.color = "rgba(0, 0, 0, 0.5)"
    location.href = "/messages"
})

userIcon.addEventListener("click", () => {
    userIcon.style.color = "rgba(0, 0, 0, 0.5)"
    location.href = "/profile"
})