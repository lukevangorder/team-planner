document.addEventListener("DOMContentLoaded", function() {

    let user = 0;
    let users = [];

    // Fetch request to get list of all users
    fetch(`http://localhost:3000/users`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        users = json;
        grabEvents();
    });

    document.getElementById('previous').addEventListener('click', function() {
        if (user > 1) { user -= 1; } else { user = users.length;} ;
        grabEvents();
    });

    document.getElementById('next').addEventListener('click', function() {
        if (user < users.length-1) { user += 1; } else { user = 0;};
        grabEvents();
    });

    for (const add of document.getElementsByClassName('addbutton')) {
        add.addEventListener('click', function() {
            addAddBox(add);
        });
    };

    function addAddBox(node) {
        let newAddBox = document.createElement('div');
        newAddBox.className = 'newevent'
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
        document.querySelector('h2').innerHTML = `Schedule for ${users[user].name}, ${users[user].role}`
        fetch(`http://localhost:3000/events/${user+1}`) .then(function(response) {
            return response.json();
        }) .then(function(json){
            let events = json;
            for (const event of events) {
                sortEvents(event);
            }
        });
    }

    function sortEvents(event) {
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

    function removeAllChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function addForm(node) {
        node.innerHTML = "<form>Event Name: <input id='formname' type='text' name='name'></input>Event Info: <input id='forminfo' type='text' name='info'></input>Starts At: <input id='formstart' type='datetime-local' name='starts_at'></input><br> Ends At: <br><input id='formend' type='datetime-local' name='ends_at'></input><br><br><input type='submit'></input></form>";
    }

    function addSubmitListener(node) {
        node.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            let formData = {
                name: document.getElementById('formname').value,
                info: document.getElementById('forminfo').value,
                starts_at: document.getElementById('formstart').value,
                ends_at: document.getElementById('formend').value,
                user_id: user+1
            };
            let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            };

            fetch('http://localhost:3000/events', configObj)    
                .then(response => {
                    if (response.ok) {
                        console.log(response.status);
                        return response.json();
                    } else {
                        console.log(response.status);
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return
                    }
                })
                .then(json => sortEvents(json))
                .catch(err => alert('Invalid Event Data. Please make sure all required fields have been filled out'));
            node.remove();
        });
    }
}); 