$(document).ready(()=>{

    if(selectedTab==="replies"){
        loadReplies();
    }else{
        loadPost();
    }

});


function loadPost(){
    $.get("/api/posts",{postedBy:profileUserId, pinned:true},(results)=>{
        outputPostIX(results)
    })

    $.get("/api/posts",{postedBy:profileUserId, isReply:false},(results)=>{
        outputPost(results)
    })
}

function loadReplies(){
    $.get("/api/posts",{postedBy:profileUserId, isReply:true},(results)=>{
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

function outputPostIX(results){
    if(results.length===0){
        $(".pinnedPostContainer").hide();
        return;
    }
   
    results.forEach(result => {
        let html=createPostHtml(result)
        $(".pinnedPostContainer").append(html);
       
    });
    
}
