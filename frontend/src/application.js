document.addEventListener("DOMContentLoaded", function() {
    let user = 0;
    let users = [];

    fetch(`http://localhost:3000/users`) .then(function(response) { //Fetches all users
        return response.json();
    }) .then(function(json) {
        for(const user of json) {
            users.push(new User(user.id, user.name, user.role));
        }
        grabEvents();
    }); 

    document.getElementById('previous').addEventListener('click', function() { //Listener to go to previous user
        if (user > 0) {
            user -= 1;
        } else {
            user = users.length-1;
        };
        grabEvents();
    }); 

    document.getElementById('next').addEventListener('click', function() { //Listener to go to next user
        if (user < users.length-1) {
            user += 1; 
        } else { 
            user = 0;
        };
        grabEvents();
    }); 

    for (const add of document.getElementsByClassName('addbutton')) { //Listener for all add buttons
        add.addEventListener('click', function() {addAddBox(add);});
    }; 

    function addAddBox(node, mode='add', event=undefined) { //Function to add the div for new or used event creation
        for (const newevent of document.getElementsByClassName('newevent')) {
            newevent.remove();
        }
        let newAddBox = document.createElement('div');
        newAddBox.className = 'newevent'
        if (mode == 'add') {
            addForm(newAddBox);
            if (node.parentNode.querySelector('div').className == 'newevent') {
                node.parentNode.querySelector('div').remove();
            } else {
                if (node.parentNode.className == 'weekend') {
                    newAddBox.style.height = '52%';
                }
                addSubmitListener(newAddBox);
                node.parentNode.insertBefore(newAddBox, node.parentNode.querySelector('div'));
            }
        } else { //If added box is for event update
            newAddBox.innerHTML = `<form>Event Name: <input id='formname' type='text' name='name' value=${"'"+event.name+"'"}></input>Event Info: <input id='forminfo' type='text' name='info' value=${"'"+event.info+"'"}>`+
            `</input>Starts At: <input id='formstart' type='datetime-local' name='starts_at' value=${event.formatStart}></input><br> Ends At: <br><input id='formend' type='datetime-local' name='ends_at' value=${event.formatEnd}>`+
            "</input><br><br><input type='submit' value='Save Changes'></input></form>";
            if (node.parentNode.className == 'weekend') {
                newAddBox.style.height = '52%';
            }
            addUpdateListener(newAddBox, event);
            node.parentNode.insertBefore(newAddBox, node);
        }
    }

    function addChildEvent(dayName, event) { //Adds events to calender divs
        let newLi = document.createElement('li');
        newLi.innerHTML = event.name;
        let newP = document.createElement('p');
        newP.innerHTML = event.stringyStart + '-' + event.stringyEnd + '<br>' + event.info; 
        let edit = document.createElement('p');
        edit.innerHTML = 'Edit Event'
        edit.addEventListener('click', function() {
            addAddBox(edit, 'update', event);
            edit.remove()
        })
        day = document.getElementById(`${dayName}`).getElementsByClassName('eventlist')[0];
        day.appendChild(newLi);
        day.appendChild(newP); 
        day.appendChild(edit);
    }

    function grabEvents() { //Grabs all events upon initialization
        removeAllEvents();
        document.querySelector('h2').innerHTML = `Schedule for ${users[user].name}, ${users[user].role}`
        fetch(`http://localhost:3000/events/${user+1}`) .then(function(response) {
            return response.json();
        }) .then(function(json) {
            users[user].events = []; //Fucking remove this nonsense Luke
            for(const event of json){
                users[user].events.push(new Event(event.id, event.info, event.name, event.starts_at, event.ends_at, event.user_id));
            }
            for (const event of users[user].events) {
                sortEvents(event);
            }
        });
    }

    function removeAllEvents() {
        for (const eventlist of document.getElementsByClassName('eventlist')) {
            removeAllChildren(eventlist);
        }
    }

    function sortEvents(event) { //Sorts event by day
        const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
        addChildEvent(dayNames[event.starts_at.getDay()], event);
    }

    function removeAllChildren(parent) { //Clears all events from a div
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function addForm(node) { //Adds html for add form
        node.innerHTML = "<form>Event Name: <input id='formname' type='text' name='name'></input>Event Info: <input id='forminfo' type='text' name='info'>"+
            "</input>Starts At: <input id='formstart' type='datetime-local' name='starts_at'></input><br> Ends At: <br><input id='formend' type='datetime-local' name='ends_at'>"+
            "</input><br><br><input type='submit'></input></form>";
    }

    function addSubmitListener(node) { //Adds unique listener to add submit buttons
        node.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/events', fetchConfig('POST'))    
                .then(response => {
                    if (response.ok) {return response.json();
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return
                    }
                })
                .then(json => sortEvents(json))
                .catch(err => alert('Invalid Event Data. Please make sure all required fields have been filled out'));
            node.remove();
        });
    }
    function addUpdateListener(node, event) { //Ads unique listener to save changes buttons
        node.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(`http://localhost:3000/events/${event.id}`, fetchConfig('PATCH'))    
            .then(response => {
                if (response.ok) { return response.json();
                } else {
                    console.log(response.status);
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return
                }
            })
            .then(json => {
                removeOutdated(event);
                event.update(json.id, json.info, json.name, json.starts_at, json.ends_at, user);
                sortEvents(event);
            })
            .catch(err => {location.reload();});
        node.remove();
        });
    }
    function removeOutdated(obsEvent) {
        events = document.querySelector('li');
        for (const event of events) {
            if (obsEvent.innerHTML == event.innerHTML) {
                event.remove();
            }
        }
    }

    function fetchConfig(method) {
        const configObj = {
            method: `${method}`,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById('formname').value,
                info: document.getElementById('forminfo').value,
                starts_at: document.getElementById('formstart').value,
                ends_at: document.getElementById('formend').value,
                user_id: user+1
            })
        };
        return configObj;
    }
}); 