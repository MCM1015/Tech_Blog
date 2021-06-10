const postID = document.querySelector("#postid").textContent
console.log(postID);

//add comment
const newComment = async (e) => {
  
    const post_id = document.querySelector('#post-id').textContent
    const user_id = document.querySelector('#user-id').textContent
    const comment = document.querySelector('#newcomment').value.trim();
  
     if(comment && user_id && post_id) {
      const response = await fetch('../api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id, user_id,}), 
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  
      if (response.ok) {
        document.location.replace(`/post/${postID}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  // delete comment
  const deletePost = async (e) => {
    if (e.target.hasAttribute('data-id')) {
          const id = e.target.getAttribute('data-id')
          console.log(id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace(`/post/${postID}`);
      } else {
        alert('Failed to delete.');
      }
    };
  }
  
  //edit comment
  const updatePost = async (e) => {
    if (e.target.hasAttribute('data-id')) {
          const id = e.target.getAttribute('data-id')
          const comment = document.querySelector(`#comment${id}`).value.trim();
          console.log(id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({"comment": comment}),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace(`/post/${postID}`);
      } else {
        alert('Failed to delete.');
      }
    };
  }

  const updateDataId = async (e) => {
    const id = $(this).attr("data-id");
    $('.update').attr("data-id", id);
  }
  
    document.querySelectorAll('.delete').forEach((item)=>{
      item.addEventListener('click', deletePost);
    })

    document.querySelectorAll('.update').forEach((item)=>{
        item.addEventListener('click', updatePost);
      })

      document.querySelectorAll('.edit').forEach((item)=>{
        item.addEventListener('click', updateDataId);
    })

    document.querySelector('#submit').addEventListener('click', newComment);
  