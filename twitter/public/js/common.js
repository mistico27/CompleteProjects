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
    $.post("/api/posts",data,(postData,status,xhr)=>{
        alert(postData);
    })

})
