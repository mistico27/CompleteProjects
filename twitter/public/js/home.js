$(document).ready(()=>{
    
    $.get("/api/posts",(results)=>{
        outputPost(results)
    })
})



function outputPost(results){
    
   
    results.forEach(result => {
        console.log("result",result);
        let html=createPostHtml(result)
        $(".postContainer").append(html);
       
    });
    if(results.length==0){
       newContainer.appendChild("<span >no results Founded </span>")
    }
}

