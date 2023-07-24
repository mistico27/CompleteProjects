
$(document).ready(()=>{
    $.get("/api/notifications",(data)=>{
        console.log(data)
       outPutnotificationList(data,$(".resultsContainer"))
    })
});

function outPutnotificationList(notifications,container){
    notifications.forEach(notification => {
        let html=createNotificationHtml(notification);
        container.append(html);
    });
    if(notifications.length==0){
         container.append("<span class='noResults'>Nothing to show</span>")   
    }
}


function createNotificationHtml(notification){
    let userFrom=notification.userFrom;
    let text=getNotificationText(notification);
    let href=getNotificationUrl(notification);
    let className= notification.opened?"":"active";
    return `<a href='#' class='resultListItem notification ${className}'>
    <div class='resultsImageContainer'>
        <img src='${userFrom.profilePic}'>
        
    </div>
    <div class='resultsDetailsContainer ellipsis'>
            <span class='ellipsis'>${text}</span>
        </div>
    </a>`
}

function getNotificationText(notification) {

    var userFrom = notification.userFrom;

    if(!userFrom.firstName || !userFrom.lastName) {
        return alert("user from data not populated");
    }

    var userFromName = `${userFrom.firstName} ${userFrom.lastName}`;
    var text;

    if(notification.notificationType == "retweet") {
        text = `${userFromName} retweeted one of your posts`;
    }
    else if(notification.notificationType == "postLike") {
        text = `${userFromName} liked one of your posts`;
    }
    else if(notification.notificationType == "reply") {
        text = `${userFromName} replied to one of your posts`;
    }
    else if(notification.notificationType == "follow") {
        text = `${userFromName} followed you`;
    }

    return `<span class='ellipsis'>${text}</span>`;
}

function getNotificationUrl(notification) { 
    var url = "#";

    if(notification.notificationType == "retweet" || 
        notification.notificationType == "postLike" || 
        notification.notificationType == "reply") {
            
        url = `/posts/${notification._id}`;
    }
    else if(notification.notificationType == "follow") {
        url = `/profile/${notification._id}`;
    }

    return url;
}