//to edit a comment
function edit(id) {
    document.querySelector(`#edit_box_${id}`).style.display = 'block';
    document.querySelector(`#edit_button_${id}`).style.display = 'block';
    document.querySelector(`#post_content_${id}`).style.display = 'none';
    document.querySelector(`#edit_${id}`).style.display = 'none';
    
    document.querySelector(`#edit_button_${id}`).addEventListener('click', () => {
        fetch('/edit/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                post: document.querySelector(`#edit_box_${id}`).value
            })
          });
        
          document.querySelector(`#edit_box_${id}`).style.display = 'none';
          document.querySelector(`#edit_button_${id}`).style.display = 'none';
          document.querySelector(`#post_content_${id}`).style.display = 'initial';
          document.querySelector(`#edit_${id}`).style.display = 'initial';

          document.querySelector(`#post_content_${id}`).innerHTML = document.querySelector(`#edit_box_${id}`).value;
    });
}

//to post under a comment
function comment(id) {
    document.querySelector(`#comment_box_${id}`).style.display = 'block';
    document.querySelector(`#comment_button_${id}`).style.display = 'block';
    document.querySelector(`#line1_${id}`).style.display = 'block';
    document.querySelector(`#comment_${id}`).style.display = 'none';
    document.querySelector(`#comment_box_${id}`).value=""
    
    document.querySelector(`#comment_button_${id}`).addEventListener('click', () => {
        if (document.querySelector(`#comment_box_${id}`).value != ""){    
            fetch('/comment/' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    post: document.querySelector(`#comment_box_${id}`).value
                })
            })
            .then((res) => res.json())
            .then((res) =>{
            location.reload();

            })  
        }
    });
}
