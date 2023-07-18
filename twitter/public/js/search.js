$("#searchBox").keydown((event) => {
    clearTimeout(timer);
    let textbox = $(event.target);
    let value = textbox.val();
    let searchType = textbox.data().search;

    timer = setTimeout(() => {
        value = textbox.val().trim();

        if(value == "") {
            $(".resultsContainer").html("");
        }
        else {
            search(value, searchType);
        }
    }, 500)

})


function search(searchTerm, searchType) {
    
    var url = searchType == "users" ? "/api/users" : "/api/posts"

    $.get(url, { search: searchTerm }, (results) => {
        


        if(searchType == "users") {
            outputPostIV(results)        }
        else {
            outputPostIXI(results)
        }

    })
}


function outputPostIXI(results){
    
   
    results.forEach(result => {
        let html=createPostHtml(result)
        $(".resultsContainer").append(html);
       
    });
    if(results.length==0){
        $(".postContainer").append("<span >no results Founded </span>")
    }
}

