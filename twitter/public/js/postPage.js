$(document).ready(()=>{
    
    $.get("/api/posts/"+postId,(results)=>{
        outputPostIII(results)
    })
})



function outputPostIII(results){
    
 
        let html=createPostHtml(results)
        $(".postContainer").append(html);
       
 
    if(results.length==0){
        $(".postContainer").append("<span >no results Founded </span>")
    }
}

