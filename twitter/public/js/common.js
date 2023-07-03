$("#postTextArea, #replyTextArea").keyup((event)=>{
    let textBox= $(event.target);
    let value=textBox.val().trim();
    
    let isModel = textBox.parents(".modal").length==1;
    let submitButton= isModel?$("#submirReplyBotton"):$("#submitPostButton");


    if(!value){
        submitButton.prop("disabled",true);
        return;
    }
        submitButton.prop("disabled",false);
    
})

///sending the user to the post page
$(document).on("click",".post",(e)=>{
    let element= $(e.target);
    let postId=getPostIdFromElement(element);
    if(postId!==undefined && !element.is("button")){
        window.location.href='/posts/'+postId;
    }
})

///follow
$(document).on("click",".followButtonFollowing",(e)=>{
    
    let button=$(e.target);
    let userId=button.data().user;
    $.ajax({
        url:`/api/users/${userId}/follow`,
        type:"PUT",
        success:(data,status, xhr)=>{
           if(xhr.status==404){
               console.log("user not found"); 
            return;
           }
        
         if(data.following && data.following.includes(userId)){
              button.addClass("following");  
              button.text("following")
         }else{
            button.removeClass("following");
            button.text("follow")
         }
         
         let followersLabel=$("#followersValue")
         if(followersLabel.length != 0){
            followersLabel.text("hi");
         }
        
        }
    })
})

///selector
$("#submitPostButton,#submirReplyBotton").click((e)=>{
    let button= $(e.target);
    let isModel = button.parents(".modal").length==1;
    let textBox =isModel?$("#replyTextArea"):$("#postTextArea");
    let data={
        content:textBox.val()
    }

    if(isModel){
        let newId=button.data().id;
        if(newId===null){
               return("button Id is null"); 
        }
        data.replyTo=newId;
    }

    $.post("/api/posts",data,(postData)=>{
        if(postData.replyTo){
            location.reload();
        }else{
            let html = createPostHtml(postData);
            $(".postContainer").prepend(html);
            textBox.val("");
            button.prop("disabled",true);
        } 
    })
})


$("#replyModal").on("show.bs.modal",(e)=>{
    let button= $(e.relatedTarget);
    let postId=getPostIdFromElement(button);
    $("#submirReplyBotton").data("id",postId);

    $.get("/api/posts/"+postId,(results)=>{
        outputPostII(results.postData);
    })

})


$("#replyModal").on("hidden.bs.modal",(e)=>{
    $("#originFormContainer").html("");

})

$("#deleteModal").on("show.bs.modal",(e)=>{
    let button= $(e.relatedTarget);
    let postId=getPostIdFromElement(button);
    $("#submiDeleteBotton").data("id",postId);

})

$("#submiDeleteBotton").click((e)=>{
    let postId= $(e.target).data("id");
    $.ajax({
        url:`/api/posts/${postId}`,
        type:"DELETE",
        success:(postData)=>{
         location.reload();
        }
    })
})

$(document).on("click",".likeBurn",(e)=>{
    let button= $(e.target);
    let postId=getPostIdFromElement(button);
    if(postId===undefined){
        return;
    }
    $.ajax({
        url:`/api/posts/${postId}/like`,
        type:"PUT",
        success:(postData)=>{
         button.find("span").text(postData.likes.length || "");
         if(postData.likes.includes(userLoggedIn._id)){
              button.addClass("active");  
         }else{
            button.removeClass("active");
         }
        }
    })
})


////retweet
$(document).on("click",".retweet",(e)=>{
    let button= $(e.target);
    let postId=getPostIdFromElement(button);
    if(postId===undefined){
        return;
    }
    $.ajax({
        url:`/api/posts/${postId}/retweet`,
        type:"POST",
        success:(postData)=>{
            console.log(postData.retweetUsers);
         button.find("span").text(postData.retweetUsers.length || "");
         if(postData.retweetUsers.includes(userLoggedIn._id)){
              button.addClass("active");  
         }else{
            button.removeClass("active");
         }
         
        }
    })
})



function getPostIdFromElement(element){
    let isRoot=element.hasClass("post");
    let rootElement = isRoot ? element:element.closest(".post");
    let postId= rootElement.data().id;
    if(postId===undefined){
        alert("post Id undefined");
    }
    return postId;
}


function createPostHtml(postData,largeFont=false){
    if(postData==null){
        return alert("post object is null");
    }
    let isRetweet = postData.retweetData!==undefined;
    let retweetedBy = isRetweet?postData.postedBy.username:null;
    
    postData =isRetweet?postData.retweetData:postData;

    let postedBy=postData.postedBy;
    console.log(postedBy._id);

    if(postedBy._id===undefined){
        console.log("ObjectUser not populated");
    }
    let displayName=postedBy.firstName + " " +postedBy.lastName;
    let timeStamp = timeDifference(new Date(), new Date(postData.createdAt));

    let likeButtonActiveClass=postData.likes.includes(userLoggedIn._id)? "active":"";
    let retweetButtonActiveClass=postData.retweetUsers.includes(userLoggedIn._id)? "active":"";
    let largeFontClass=largeFont?"largeFont":"";

    let retweetText ='';
    if(isRetweet){
        retweetText=`<span>
        <ion-icon name="cloud-upload-outline"></ion-icon> 
            get re-ikki by <a href='/profile/${retweetedBy}'>@${retweetedBy}</a>
        </span>`
    }

    let replyFlag="";
    if(postData.replyTo && postData.replyTo._id){
        if(!postData.replyTo._id){
            console.log("Reply is not populated!!");

        }else if(!postData.replyTo.postedBy){
            console.log("posted by is not populated!!");
        }
        let replyToUsername=postData.replyTo.postedBy.username;
       replyFlag=`<div class='replyFlag'>
            Replying to <a href=''>@${replyToUsername}</a>
       </div>`
    }
    

    let button="";
    if(postData.postedBy._id==userLoggedIn._id){
        button=`<button data-id="${postData._id}" data-bs-toggle="modal" data-bs-target="#deleteModal">
        <ion-icon name="close-outline"></ion-icon> 
        </button>`
    }

    return `<div class='post ${largeFontClass}' data-id='${postData._id}'>
            <div class='postActionContainer'>
                ${retweetText}
            </div>
        <div class='mainContentContainer'>
            <div class='userImageContainer'>
                <img src='${postedBy.profilePic}'/>
            </div>
            <div class='postContenContainer'>
                <div class='header'>
                    <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                    <span class='username'>${postedBy.username}</span>
                    <span class='date'>${timeStamp}</span>
                    ${button}
                </div>
                ${replyFlag}
                <div class='postBody'>
                    <span>${postData.content}</span>
                </div>
                <div class='postFooter'>
                    <div class='postButtoncontainer'>
                        <button data-bs-toggle='modal' data-bs-target="#replyModal">
                        <ion-icon name="cloud-done-outline"></ion-icon>
                        </button>
                    </div>
                    <div class='postButtoncontainer green'>    
                        <button class='retweet ${retweetButtonActiveClass}'>
                        <ion-icon name="cloud-upload-outline"></ion-icon>  
                        <span id='posdataII'>${postData.retweetUsers.length || ""}</span>
                         </button>
                    </div>
                    <div class='postButtoncontainer red'>     
                        <button class='likeBurn ${likeButtonActiveClass}'>
                        <ion-icon name="heart-circle-outline"></ion-icon>
                        <span id='posdataII'>${postData.likes.length || ""}</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now";
        
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function outputPostII(results){
    if(!Array.isArray(results)){
        results=[results];
    }
   
    results.forEach(result => {
        let html=createPostHtml(result)
        $("#originFormContainer").append(html);
       
    });
    if(results.length==0){
        $("#originFormContainer").append("<span >no results Founded </span>")
    }
}


function outputPostIIIWitReplies(results){
    
    if(results.replyTo!==undefined && results.replyTo._id!==undefined){
        let html=createPostHtml(results.replyTo);
        $(".postContainer").append(html);
    }
    let mainpotshtml=createPostHtml(results.postData,true);
        $(".postContainer").append(mainpotshtml);

        results.replies.forEach(result => {
            let html=createPostHtml(result)
            $(".postContainer").append(html); 
        });

}