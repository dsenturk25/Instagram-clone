
window.onload = () => {

    // DOM Elements
    const searchInput = document.getElementById("search-input");
    console.log("hi");

    searchInput.addEventListener("keydown", () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/users/getAll");
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.send(JSON.stringify({
            search: searchInput.value
        }));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.response)
                } else {
                    console.log("Error occured")
                }
            }
        }

    })
}