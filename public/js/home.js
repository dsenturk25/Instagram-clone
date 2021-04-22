
//DOM elements
const mainTitle = document.getElementById("main-title")

window.onload = () => {
    mainTitle.addEventListener("click", () => {
        mainTitle.style.color = "rgba(0, 0, 0, 0.5)"
        location.href = "/home"
    })
}