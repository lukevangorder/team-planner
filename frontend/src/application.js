let user = 1;
let users = [];


document.addEventListener("DOMContentLoaded", function() {

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

    for (const add of document.getElementsByClassName('addbutton')) {
        add.addEventListener('click', function() {
            addAddBox(add);
        });
    };
});

function addAddBox(node) {
    let newAddBox = document.createElement('div');
    newAddBox.className = 'newevent'
    addForm(newAddBox);
    if (node.parentNode.querySelector('div').className == 'newevent') {
        node.parentNode.querySelector('div').remove();
    } else {
        node.parentNode.insertBefore(newAddBox, node.parentNode.querySelector('div'));
    }
}

function addChildEvent(dayName, event) {
    let newLi = document.createElement('li');
    newLi.innerHTML = event.name;
    let newP = document.createElement('p');
    newP.innerHTML = event.info; 
    day = document.getElementById(`${dayName}`).getElementsByClassName('eventlist')[0];
    day.appendChild(newLi);
    day.appendChild(newP); 
}

function grabEvents() {
    for (const eventlist of document.getElementsByClassName('eventlist')) {
        removeAllChildren(eventlist);
    }
    console.log(users[user])
    fetch(`http://localhost:3000/events/${user}`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        let events = json;
        for (const event of events) {
            let d = new Date(event.starts_at)
            let DOW = d.getDay();
            switch (DOW) {
                case 0:
                    addChildEvent('sunday', event);
                    break;
                case 1:
                    addChildEvent('monday', event);
                    break;
                case 2:
                    addChildEvent('tuesday', event);
                    break;
                case 3:
                    addChildEvent('wednesday', event);
                    break;
                case 4:
                    addChildEvent('thursday', event);
                    break;
                case 5:
                    addChildEvent('friday', event);
                    break;
                case 6:
                    addChildEvent('saturday', event);
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

function addForm(node) {
    node.innerHTML = "<form>Event Name: <input type='text' name='name'></input>Event Info: <input type='text' name='info'></input>Starts At: <input type='date' name='starts_at'></input><br> Ends At: <br><input type='date' name='ends_at'></input><br><br><input type='submit'></input></form>";
}

