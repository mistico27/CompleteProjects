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
        console.log(newId);
        if(newId===null){
               return("button Id is null"); 
        }
        data.replyTo=newId;
    }

    $.post("/api/posts",data,(postData)=>{
        let html = createPostHtml(postData);
        $(".postContainer").prepend(html);
        textBox.val("");
        button.prop("disabled",true);
    })

})


$("#replyModal").on("show.bs.modal",(e)=>{
    let button= $(e.relatedTarget);
    let postId=getPostIdFromElement(button);
    $("#submirReplyBotton").data("id",postId);

    $.get("/api/posts/"+postId,(results)=>{
        outputPostII(results);
    })

})


$("#replyModal").on("hidden.bs.modal",(e)=>{
    $("#originFormContainer").html("");

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


function createPostHtml(postData){
    if(postData==null){
        return alert("post object is null");
    }
    let isRetweet = postData.retweetData!==undefined;
    let retweetedBy = !isRetweet?postData.postedBy.username:null;
    
    postData =isRetweet?postData.retweetData:postData;


    let postedBy =postData.postedBy;
    console.log(postedBy.firstName);

    let displayName=postData.postedBy.firstName + " " +postData.postedBy.lastName;
    let timeStamp = postData.createdAt;

    let likeButtonActiveClass=postData.likes.includes(userLoggedIn._id)? "active":"";
    let retweetButtonActiveClass=postData.retweetUsers.includes(userLoggedIn._id)? "active":"";

    let a='<ion-icon name="cloud-upload-outline"></ion-icon'

    
    return `<div class='post' data-id='${postData._id}'>
            <div class='postActionContainer'>
            
        <div class='mainContentContainer'>
            <div class='userImageContainer'>
                <img src='${postData.postedBy.profilePic}'/>
            </div>
            <div class='postContenContainer'>
                <div class='header'>
                    <a href='/profile/${postData.postedBy.username}' class='displayName'>${displayName}</a>
                    <span class='username'>${postData.postedBy.username}</span>
                    <span class='date'>${get_time_diff(timeStamp)}</span>
                </div>
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

function get_time_diff( datetime )
{
    var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

    var datetime = new Date( datetime ).getTime();
    var now = new Date().getTime();

    if( isNaN(datetime) )
    {
        return "";
    }

  

    if (datetime < now) {
        var milisec_diff = now - datetime;
    }else{
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date( milisec_diff );

    return  date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
}


function outputPostII(results){
    if(!Array.isArray(results)){
        results=[results];
    }
   
    results.forEach(result => {
        console.log("result",result);
        let html=createPostHtml(result)
        $("#originFormContainer").append(html);
       
    });
    if(results.length==0){
        $("#originFormContainer").append("<span >no results Founded </span>")
    }
}
