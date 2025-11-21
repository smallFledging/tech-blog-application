const postList = document.getElementById('postList');
postList.style.textAlign ='center';

async function getPosts() {
    const protectedRes = await fetch('http://localhost:3001/protected');
    const data = await protectedRes.json();
    console.log(data.rows);
    if(data.rows?.length) {
        createPosts(data.rows);
    }
    else {
        postList.textContent = "No posts to display.";
    }
}

function createPosts(data) {

    const categoryArr = ['Tech', 'Finance', 'Cute'];

    let posts = '';
    data.forEach(post => {
        posts += '<div>'
        posts += '<p id="categoryName">' + categoryArr[post.category_id-1] + '</p>';
        posts += '<p id="postName"><b>' + post.post_name + '</b></p>';
        posts += '<p id="postContent">' + post.post_content + '</p>';
        posts += '<button id="edit" onclick=editPost(this)>Edit</button>';
        posts += '<button id="delete">Delete</button>';
        posts += '</div>'
    });
    postList.innerHTML += posts;
}

function editPost(button) {
    console.log("test", button.parentElement);

    const editPostPopup = document.getElementById('editPostPopup');
    if(editPostPopup.children.length) {
        editPostPopup.innerHTML = '';
    }
    else {
        console.log(button.parentElement.childNodes[2]);
        const postTitle = button.parentElement.childNodes[1].innerText;
        const postContent = button.parentElement.childNodes[2].innerText;
        editPostPopup.innerHTML = `
        <div class="popup">
            <label for="postTitle">Edit title </label>
            <input type="text" id="postTitle" value="${postTitle}"></input>
            <label for="postContent">Edit content </label>
            <textarea type="text" id="postContent"> ${postContent}</textarea>
            <button> Update </button>
        </div>
        `;
    }

}



getPosts();