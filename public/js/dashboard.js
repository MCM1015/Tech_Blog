//create new post
//post route
const newPost = async (e) => {


    const user_id = document.querySelector('#newuser-id').textContent
    const title = document.querySelector('#newtitle').value.trim();
    const contents = document.querySelector('#newcontent').value.trim();

    if (contents && user_id && title) {
        const response = await fetch('./api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, contents, user_id, }),
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

//delete post
//delete route
const deletePost = async (e) => {
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id')
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete.');
        }
    };
}

//update post 
//put route
const updatePost = async (e) => {
    //const postID = document.querySelector("#postid").textContent
    // document.querySelectorAll('.delete').forEach((item) => {
    //     item.addEventListener('click', deletePost);
    // })
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id')
        const title = document.querySelector(`#title${id}`).value.trim();
        const contents = document.querySelector(`#contents${id}`).value.trim();
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ "title": title, "contents": contents }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update.');
        }
    };
}

const updateDataId = async (e) => {
    const id = $(this).attr("data-id");
    $('.update').attr("data-id", id);
}

document.querySelectorAll('.delete').forEach((item) => {
    item.addEventListener('click', deletePost);
})

document.querySelectorAll('.update').forEach((item) => {
    item.addEventListener('click', updatePost);
})

document.querySelectorAll('.edit').forEach((item) => {
    item.addEventListener('click', updateDataId);
})

document.querySelector('#submit').addEventListener('click', newPost);
