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

function outputPostIV(results){
    results.forEach(result => {
        let html= createUserHtml(result,true);
        $(".resultsContainer").append(html);
    });
    if(results.length == 0){
        $(".resultsContainer").append('<span>No results available</span>');

    }
}



function createUserHtml(userData,showFollowBotton){ 
    let name=userData.firstName + " " + userData.lastName;
return `<div class='user'>
<div class='userImagecontainer'>
        <img src='${userData.profilePic}'>
    </div>
    <div class='userDetailsContainer'>
        <div class='header'>
            <a href='/profile/${userData.username}'>${name}</a>   
            <span class='username'>${userData.username}</span>    
        </div>
    </div>
</div>`;
}