$(document).ready(()=>{
    $.get(`/api/chats/${chatId}`,(data)=>{
        $("#chatName").text(getChatName(data));
    })
})

$("#chatNameModalBotton").click(()=>{
    let name=$("#chatNameTextBox").val().trim();
    
    $.ajax({
        url:"/api/chats/" + chatId,
        type:"PUT",
        data:{chatName:name},
        success:(data,status,xhr)=>{
            if(xhr.status != 204){
                alert("could not update");
            }else{
                location.reload();
            }
        }
    })
})


$(".sendMessageButton").click(()=>{
    messageSubmitted();
})

$(".inputTextBox").keydown((e)=>{
    if(e.which===13){
        messageSubmitted();
        return false;
    }
    
})

function messageSubmitted(){
    let content=$(".inputTextBox").val().trim();
    if(content!=""){
        sendMessage(content);
        $(".inputTextBox").val("");
    }
   
}


function sendMessage(content){
    $.post("/api/messages",{content:content,chatId:chatId},(data,status,xhr)=>{
        addChatMessageHtml(data);
    })
}

function addChatMessageHtml(message){
    if(!message || !message._id){
        alert("Message is not valid");
        return;
    }

    let messageDiv = createMessageHtml(message);
    $(".chatMessages").append(messageDiv);


}


function createMessageHtml(message){

    let isMine = message.sender._id == userLoggedIn._id;
    let liClassName = isMine ? "mine": "theirs";

    return `<li class='message ${liClassName}'>
            <div class='messageContainer'>
                <span class='messageBody'>
                    ${message.content}
                </span>
            </div>
    </li>
    `
}
