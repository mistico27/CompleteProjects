$(document).ready(()=>{
    
    $.get("/api/posts",(results)=>{
        outputPost(results)
    })
})



function outputPost(results){
    
   
    results.forEach(result => {
        let html=createPostHtml(result)
        $(".postContainer").append(html);
       
    });
    if(results.length==0){
        $(".postContainer").append("<span >no results Founded </span>")
    }
}

