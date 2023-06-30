$(document).ready(()=>{
    
    $.get("/api/posts/"+postId,(results)=>{
        outputPostIIIWitReplies(results)
    })
})





