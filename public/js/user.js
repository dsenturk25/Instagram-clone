
function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

window.onload = () => {

    // DOM Element
    const userShareContent = document.getElementById("user-share-content");
    const username = document.getElementById("user-username").innerHTML;
    const name = document.getElementById("user-name").innerHTML.split(" ")[0];

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/shares");
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({
        username: username,
        name: name
    }))

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const userShareArray = JSON.parse(xhr.response);
                userShareArray.forEach(share => {

                    const eachUserShare = document.createElement("div");
                    eachUserShare.classList.add("each-user-share")

                    const photoBuffer = toBase64(share.content.data);
                    const newShare = document.createElement("img");
                    newShare.src = `data:image/png;base64,${photoBuffer}`;

                    eachUserShare.appendChild(newShare);
                    userShareContent.appendChild(eachUserShare);
                })
            }
        }
    }
}