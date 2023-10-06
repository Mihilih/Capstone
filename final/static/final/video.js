//To render the database related to a video
function video(id){
    
    fetch('/video_code/', {
        method: 'PUT',
        body: JSON.stringify({
            id: id
        })
    })
    .then((res) => res.json())
    .then((res) =>{
        console.log(res.code)
        if(document.querySelector(`#video${id}`).innerHTML==res.code){
            document.querySelector(`#video${id}`).innerHTML=""
        }else{
            document.querySelector(`#video${id}`).innerHTML=res.code
        }
        
        
    });
}