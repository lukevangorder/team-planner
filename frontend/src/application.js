document.addEventListener("DOMContentLoaded", function() {

    
    let user = 1;
    let users = [];

    // Fetch request to get list of all users
    fetch(`http://localhost:3000/users`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        users = json;
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

    document.getElementById('previous').addEventListener('click', function() {
        if (user > 1) {
            user -= 1;
        } else {
            user = users.length;
        }
        grabEvents();
    });

    document.getElementById('next').addEventListener('click', function() {
        if (user < users.length) {
            user += 1;
        } else {
            user = 1;
        }
        grabEvents();
    });
});