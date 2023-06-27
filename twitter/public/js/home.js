$(document).ready(()=>{
    
    $.get("/api/posts",(results)=>{
        outputPost(results,"${.postContainer}")
    })
})


function outputPost(results,container){
    results.forEach(result => {
        console.log(result);
        let html=createPostHtml(result)
        $('container').append(html);
    });
    if(results.length==0){
        $('container').appendChild("<span >no results Founded </span>")
    }
}