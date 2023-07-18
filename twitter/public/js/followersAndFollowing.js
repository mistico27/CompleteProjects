$(document).ready(()=>{

    if(selectedTab==="followers"){
        loadFollowers();
    }else{
        loadFollowing();
    }

});


function loadFollowers(){
    $.get(`/api/users/${profileUserId}/followers`,(results)=>{
        outputPostIV(results.followers)
    })
}

function loadFollowing(){
    $.get(`/api/users/${profileUserId}/following`,(results)=>{
        outputPostIV(results.following)
    })
}

