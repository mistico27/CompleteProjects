$(document).ready(()=>{
    $.get("/api/chats",(data,status,xhr)=>{
        if(xhr==400){
              alert("Could not get chat list.")  
        }
        else{
            outputChatList(data,$(".resultsContainer"));
        }
    })
})


function outputChatList(chatList,container){
    chatList.forEach(chat=>{
        let html=createChatHtml(chat);
        container.append(html);
    })
    if(chatList.length==0){
        container.append("<span class='noResults'>Nothing to Show</span>")
    }

}

function createChatHtml(chatData){
    let chatName=getChatName(chatData);
    let image=getChatImageElements(chatData);
    let latestMessage="This is the latest Message...";
    return`<a href='/messages/${chatData._id}' class='resultListItem'>
                ${image}
                <div class='resultsDetailContainer'>
                    <span class='heading'>${chatName}</span>
                    <span class='subtext'>${latestMessage}</span>
                </div>
        </a>`;
}


function getChatName(chatData){
    let chatName=chatData.chatName;
    if(!chatName){
        let otherChatUsers=getOtherChatUsers(chatData.users);
        let namesArray=otherChatUsers.map(user=>user.firstName + " " + user.lastName);
        chatName=namesArray.join(", ")
    }
    return chatName;
}


function getOtherChatUsers(users) {
    if(users.length == 1) return users;

    return users.filter(user => user._id != userLoggedIn._id);
}

function getChatImageElements(chatData) {
    var otherChatUsers = getOtherChatUsers(chatData.users);
    var groupChatClass = "";
    var chatImage = getUserChatImageElement(otherChatUsers[0]);    
    if(otherChatUsers.length > 1) {
        groupChatClass = "groupChatImage";
        chatImage += getUserChatImageElement(otherChatUsers[1]);
    }

    return `<div class='resultsImageContainer ${groupChatClass}'>${chatImage}</div>`;
}

function getUserChatImageElement(user){
    if(!user || !user.profilePic){
        return alert("user passed into funcion is invalid");
    }

    return `<img src='${user.profilePic}' alt='User´s profile Pic'>`;

}
