async function getPosts() {
        const protectedRes = await fetch('http://localhost:3001/protected');
        const data = await protectedRes.json();
        console.log(data.rows);
        createPosts(data.rows);
}

function createPosts(data) {

    const categoryArr = ['Tech', 'Finance', 'Cute'];

    const postList = document.getElementById('postList');
    postList.style.textAlign ='center';
    let posts = '';
    data.forEach(post => {
        posts += '<p>' + categoryArr[post.category_id-1] + '</p>';
        posts += '<p><b>' + post.post_name + '</b></p>';
        posts += '<p>' + post.post_content + '</p>';
    });
    postList.innerHTML += posts;
} 

function logout() {
    console.log("logout");
}

getPosts();