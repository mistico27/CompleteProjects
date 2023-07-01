$(document).ready(()=>{

    loadPost();

});


function loadPost(){
    $.get("/api/posts",{postedBy:profileUserId, isReply:false},(results)=>{
        outputPost(results)
    })
}

function outputPost(results){
    
   
    results.forEach(result => {
        let html=createPostHtml(result)
        $(".postContainer").append(html);
       
    });
    if(results.length==0){
        $(".postContainer").append("<span >no results Founded </span>")
    }
}