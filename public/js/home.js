window.onload = () => {
    
    //DOM elements
    const editBioButton = document.getElementById("bio-edit-button");
    const profileContent = document.getElementById("profile-content");
    const bioInfo = document.getElementById("profile-content-bio-info");
    const fileInput = document.getElementById("upload-file-input");
    const uploadSubmitButton = document.getElementById("upload-submit-button");
    const uploadPhotoContent = document.getElementById("upload-photo-content");
    
    editBioButton.addEventListener("click", () => {

        profileContent.style.height = "30%";
        editBioButton.setAttribute("disabled", "disabled");

        uploadPhotoContent.style.marginTop = "20%"

        const bioEditInput = document.createElement("textarea");
        const saveButton = document.createElement("button");

        saveButton.classList.add("profile-bio-edit-button");
        saveButton.innerText = "Save";

        bioInfo.style.display = "none";

        bioEditInput.style.resize = "vertical";
        bioEditInput.style.height = "100px";
        bioEditInput.style.fontFamily = "helvetica";

        profileContent.appendChild(bioEditInput);
        profileContent.appendChild(saveButton);

        saveButton.addEventListener("click", () => {;
            const newBioValue = bioEditInput.value;
            bioInfo.innerHTML = newBioValue;
            bioInfo.style.display = "initial";
            editBioButton.innerText = "Edit";
            profileContent.removeChild(bioEditInput);
            profileContent.style.height = "20%";
            profileContent.removeChild(saveButton);
            editBioButton.removeAttribute("disabled");

            const xhr = new XMLHttpRequest();
            xhr.open("PATCH", "/auth/profile/bio");
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.send(JSON.stringify({
                bio: bioInfo.innerHTML
            }));

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        alert("Bio updated");
                    } else{
                        alert("Could not update bio. Please try again.");
                    };
                };
            };
            uploadPhotoContent.style.marginTop = "200px"
        });
    });

    uploadSubmitButton.addEventListener("click", () => {
        uploadSubmitButton.style.background = "rgb(0, 140, 200)";
        if (fileInput.files[0] = undefined) {
            alert("Please choose a file.");
        } else{
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/share/create");

            const photo = fileInput.files[0];

            var formData = new FormData();
            formData.append("photo", photo);

            xhr.send(formData);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 201) {
                        alert("Photo has successfully uploaded")
                    } else{
                        alert("Cannot upload photo")
                    }
                }
            }
        }
        uploadSubmitButton.style.background = "rgb(0, 140, 255)"
    });
}