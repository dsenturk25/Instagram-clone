
window.onload = () => {

    //DOM elements
    const nameInput = document.getElementById("name-input");
    const surnameInput = document.getElementById("surname-input");
    const emailInput = document.getElementById("email-input");
    const bioInfoEdit = document.getElementById("bio-info-edit");
    const webInput = document.getElementById("web-input");
    const genderInput = document.getElementById("gender-input");
    const submitButton = document.getElementById("submit-button");

    if (webInput.value == "null") {
        webInput.value = "";
    } else {
        webInput.value = webInput.value;
    }

    submitButton.addEventListener("click", () => {
        submitButton.setAttribute("disabled", "disabled");
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", "/auth/profile");
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.send(JSON.stringify({
            name: nameInput.value,
            surname: surnameInput.value,
            email: emailInput.value,
            bio: bioInfoEdit.value,
            website: webInput.value,
            gender: genderInput.value
        }));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {;
                if (xhr.status === 200) {
                    alert("Profile successfully updated!");
                } else{
                    alert("Profile could not updated, please try again.");
                }
            };
        };
    });
}
