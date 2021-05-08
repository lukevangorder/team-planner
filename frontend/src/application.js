document.addEventListener("DOMContentLoaded", function() {
    let user = 1;
    fetch(`http://localhost:3000/events/${user}`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        console.log(json);
    });
});