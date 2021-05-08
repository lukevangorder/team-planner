document.addEventListener("DOMContentLoaded", function() {

    
    let user = 1;

    // Fetch request to get list of all users
    fetch(`http://localhost:3000/users`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        let users = json;
    });

    fetch(`http://localhost:3000/events/${user}`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        let events = json;
        console.log(events);
    });

    function grabEvents() {
        fetch(`http://localhost:3000/events/${user}`) .then(function(response) {
            return response.json();
        }) .then(function(json){
            let events = json;
            console.log(events);
        });
    }

    function nextUser() {
        user += 1;
        grabEvents();
    }

    function previousUser() {
        user -= 1;
        grabEvents();
    }

    document.getElementById('previous').addEventListener('click', previousUser());
    document.getElementById('next').addEventListener('click', nextUser());
});