
function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

window.onload = () => {
    topContentJS()
    //DOM elements
    const editBioButton = document.getElementById("bio-edit-button");
    const profileContent = document.getElementById("profile-content");
    const bioInfo = document.getElementById("profile-content-bio-info");
    const fileInput = document.getElementById("upload-file-input");
    const uploadSubmitButton = document.getElementById("upload-submit-button");
    const uploadPhotoContent = document.getElementById("upload-photo-content");
    const postContent = document.getElementById("post-content")

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/followings/shares");
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const sharesArray = JSON.parse(xhr.response);
            sharesArray.forEach(shares => {
                console.log("a")
                const username = shares[shares.length - 1].username;
                for (let i = 0; i < shares.length - 1; i++) {
                    photoData = shares[i].content.data;
                    const eachPost = document.createElement("div");
                    eachPost.classList.add("each-post");

                    const postHeader = document.createElement("div");
                    postHeader.classList.add("post-header");

                    const profilePictureDefault = document.createElement("img");
                    profilePictureDefault.src = "../res/img/profile1.jpeg";

                    const usernameSpan = document.createElement("span");
                    usernameSpan.innerHTML = username

                    postHeader.appendChild(profilePictureDefault);
                    postHeader.appendChild(usernameSpan);

                    const postImage = document.createElement("div");
                    postImage.classList.add("post-image");

                    const postImageContent = document.createElement("img")
                    const photoBuffer = toBase64(photoData)
                    postImageContent.src = `data:image/png;base64,${photoBuffer}`;

                    postImage.appendChild(postImageContent);
                    
                    eachPost.appendChild(postHeader);
                    eachPost.appendChild(postImage);

                    postContent.appendChild(eachPost);
                }
            })
        }
    }
    
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