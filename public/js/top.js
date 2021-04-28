
window.onload = () => {

    // DOM Elements
    let searchInput = document.getElementById("search-input");
    const usersList = document.createElement("div");
    const allContent = document.getElementById("all-content");
    const notFoundDiv = document.createElement("div");
    var eachListElement;
    var profilePhoto;
    var eachListElementWritings;
    var eachListElementWritingsUsername;
    var eachListElementWritingsName;
    var filteredArray = [];

    searchInput.addEventListener("keyup", (e) => {

        if (notFoundDiv.parentNode === usersList) {
            usersList.removeChild(notFoundDiv);
        }

        usersList.innerHTML = null;
        e.preventDefault();

        usersList.classList.add("users-list");
        allContent.appendChild(usersList);
        const xhr = new XMLHttpRequest()
        xhr.open("GET", "/users/getAll");
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const users = JSON.parse(xhr.response);
                filteredArray = users.filter(user => {
                    return user.username.includes(searchInput.value);
                })
                

                filteredArray.forEach(user => {

                    eachListElement = document.createElement("div");
                    profilePhoto = document.createElement("div");
                    eachListElementWritings = document.createElement("div");
                    eachListElementWritingsUsername = document.createElement("div")
                    eachListElementWritingsName = document.createElement("div")

                    eachListElement.classList.add("each-list-element");
                    usersList.appendChild(eachListElement);

                    profilePhoto.classList.add("profile-photo");
                    eachListElement.appendChild(profilePhoto);

                    
                    eachListElementWritingsUsername.classList.add("each-list-element-writings-username");
                    
                    eachListElementWritingsName.classList.add("each-list-element-writings-name");

                    eachListElementWritingsUsername.innerHTML = user.username;
                    eachListElementWritings.appendChild(eachListElementWritingsUsername);

                    eachListElementWritingsName.innerHTML = user.name;
                    eachListElementWritings.appendChild(eachListElementWritingsName);

                    eachListElement.appendChild(eachListElementWritings);

                    eachListElement.addEventListener("click", () => {
                        const username = user.username;
                        const name = user.name;
                        location.href = `/users?username=${username}&name=${name}`;
                    })

                });

                if (filteredArray.length === 0) {
                    notFoundDiv.innerHTML = "Cannot find user";
                    notFoundDiv.classList.add("not-found-div");
                    usersList.appendChild(notFoundDiv);
                }
            }
        }
        if (searchInput.value === "") {
            allContent.removeChild(usersList);
        }
    })
}