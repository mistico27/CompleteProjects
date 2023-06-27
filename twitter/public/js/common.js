$("#postTextArea").keyup((event)=>{
    let textBox= $(event.target);
    let value=textBox.val().trim();
    
    let submitButton= $("#submitPostButton");
    if(submitButton.length==0){
        
    }

    if(!value){
        submitButton.prop("disabled",true);
        return;
    }
        submitButton.prop("disabled",false);
    
})

///selector
$("#submitPostButton").click((e)=>{
    let button= $(e.target);
    let textBox =$("#postTextArea");
    let data={
        content:textBox.val()
    }
    $.post("/api/posts",data,(postData)=>{
        let html = createPostHtml(postData);
        $(".postContainer").prepend(html);
        textBox.val("");
        button.prop("disabled",true);
    })

})


function createPostHtml(postData){
    let postedBy =postData.postedBy;
    let displayName=postedBy.firstName + " " +postedBy.lastName;
    let timeStamp = postData.createdAt;

    
    
    return `<div class='post'>

        <div class='mainContentContainer'>
            <div class='userImageContainer'>
                <img src='${postedBy.profilePic}'/>
            </div>
            <div class='postContenContainer'>
                <div class='header'>
                    <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                    <span class='username'>${postedBy.username}</span>
                    <span class='date'>${timeStamp}</span>
                </div>
                <div class='postBody'>
                    <span>${postData.content}</span>
                </div>
                <div class='postFooter'>
                    <div class='postButtoncontainer'>
                        <button>
                        <ion-icon name="cloud-done-outline"></ion-icon>
                        </button>
                        <button>
                        <ion-icon name="cloud-upload-outline"></ion-icon>                        </button>
                        <button>
                        <ion-icon name="heart-circle-outline"></ion-icon>                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}