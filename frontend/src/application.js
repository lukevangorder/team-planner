document.addEventListener("DOMContentLoaded", function() {



    const monday = dayListFinder('monday')
    const tuesday = dayListFinder('tuesday')
    const wednesday = dayListFinder('wednesday')
    const thursday = dayListFinder('thursday')
    const friday = dayListFinder('friday')
    const saturday = dayListFinder('saturday')
    const sunday = dayListFinder('sunday')


    // Fetch request to get list of all users
    fetch(`http://localhost:3000/users`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        users = json;
    });

    grabEvents();

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

let user = 1;
let users = [];

function dayListFinder(dayName) {
    document.getElementById(`${dayName}`).getElementsByClassName('eventlist')[0];
}

function addChildEvent(dayName, event) {
    let newLi = document.createElement('li');
    newLi.innerHTML = event.name;
    day = document.getElementById(`${dayName}`).getElementsByClassName('eventlist')[0];
    day.appendChild(newLi);
}

function grabEvents() {
    for (const eventlist of document.getElementsByClassName('eventlist')) {
        removeAllChildren(eventlist);
    }
    fetch(`http://localhost:3000/events/${user}`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        let events = json;
        console.log(events);
        for (const event of events) {
            let d = new Date(event.starts_at)
            let DOW = d.getDay();
            switch (DOW) {
                case 0:
                    break;
                case 1:
                    addChildEvent('monday', event);
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;

            }
        }
    });
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}