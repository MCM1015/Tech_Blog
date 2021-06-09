//add comment
//edit comment
//for each comment document.queryselectorAll('.comment-card'), button edit
//delete comment
//for each comment document.queryselectorAll('.comment-card'), delete edit

const newComment = async (e) => {
  
    const post_id = document.querySelector('#post-id')
    const comment = document.querySelector('#comment').value.trim();
  
     if(comment) {
      const response = await fetch('api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment}), post_id,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  // delete comment
  // delete not working immediately after adding a new comment
  const deletePost = async (e) => {
    if (e.target.hasAttribute('data-id')) {
          const id = e.target.getAttribute('data-id')
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete.');
      }
    };
  }
  
  //edit comment
  //add code here // post mvp
  
    document.querySelectorAll('.delete').forEach((item)=>{
      item.addEventListener('click', deletePost);
    })
    document.querySelector('#submit').addEventListener('click', newComment);
  