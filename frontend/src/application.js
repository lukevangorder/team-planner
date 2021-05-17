document.addEventListener("DOMContentLoaded", function() {

    let user = 0;
    let users = [];

    // Fetch request to get list of all users
    fetch(`http://localhost:3000/users`) .then(function(response) {
        return response.json();
    }) .then(function(json){
        for(const user of json) {
            users.push(new User(user.id, user.name, user.role));
        }
        grabEvents();
    });

    document.getElementById('previous').addEventListener('click', function() {
        if (user > 0) { user -= 1; } else { user = users.length-1;} ;
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

    function addAddBox(node, mode='add', event=undefined) {
        for (const newevent of document.getElementsByClassName('newevent')) {
            newevent.remove();
        }
        let newAddBox = document.createElement('div');
        newAddBox.className = 'newevent'
        if (mode == 'add'){
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
        } else {
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

    function addEditBox(node, event) {
        addAddBox(node, 'update', event);
    }

    function addChildEvent(dayName, event) {
        let newLi = document.createElement('li');
        newLi.innerHTML = event.name;
        let newP = document.createElement('p');
        newP.innerHTML = event.stringyStart + '-' + event.stringyEnd + '<br>' + event.info; 
        let edit = document.createElement('p');
        edit.innerHTML = 'Edit Event'
        edit.addEventListener('click', function() {
            addEditBox(edit, event);
        })
        day = document.getElementById(`${dayName}`).getElementsByClassName('eventlist')[0];
        day.appendChild(newLi);
        day.appendChild(newP); 
        day.appendChild(edit);
    }

    function grabEvents() {
        for (const eventlist of document.getElementsByClassName('eventlist')) {
            removeAllChildren(eventlist);
        }
        document.querySelector('h2').innerHTML = `Schedule for ${users[user].name}, ${users[user].role}`
        fetch(`http://localhost:3000/events/${user+1}`) .then(function(response) {
            return response.json();
        }) .then(function(json){
            users[user].events = []; //Fucking remove this nonsense Luke
            for(const event of json){
                users[user].events.push(new Event(event.id, event.info, event.name, event.starts_at, event.ends_at, event.user_id));
            }
            for (const event of users[user].events) {
                sortEvents(event);
            }
        });
    }

    function sortEvents(event) {
        let d = event.starts_at
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
        node.innerHTML = "<form>Event Name: <input id='formname' type='text' name='name'></input>Event Info: <input id='forminfo' type='text' name='info'>"+
            "</input>Starts At: <input id='formstart' type='datetime-local' name='starts_at'></input><br> Ends At: <br><input id='formend' type='datetime-local' name='ends_at'>"+
            "</input><br><br><input type='submit'></input></form>";
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

    function addUpdateListener(node, event) {
        node.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            let formData = {
                id: event.id,
                name: document.getElementById('formname').value,
                info: document.getElementById('forminfo').value,
                starts_at: document.getElementById('formstart').value,
                ends_at: document.getElementById('formend').value,
                user_id: user+1
            };
            let configObj = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            };
            console.log(formData);
            fetch(`http://localhost:3000/events/${event.id}`, configObj)    
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
            .then(json => {
                event.update(json.id, json.info, json.name, json.starts_at, json.ends_at, user);
                console.log(json);
                console.log(event);
                sortEvents(event);
            })
            .catch(err => {
                alert('Invalid Event Data. Please make sure all required fields have been filled out');
            });
        node.remove();
        });
    }
}); 

class User {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.events = [];
    }
}

class Event {
    constructor(id, info, name, starts_at, ends_at, user_id) {
        this.id = id;
        this.info = info;
        this.name = name;
        this.starts_at = new Date (starts_at);
        this.ends_at = new Date(ends_at);
        this.user_id = user_id;
    }

    update(id, info, name, starts_at, ends_at, user_id) {
        this.id = id;
        this.info = info;
        this.name = name;
        this.starts_at = new Date (starts_at);
        this.ends_at = new Date(ends_at);
        this.user_id = user_id;
    }

    get stringyStart() {
        let minutes = String(this.starts_at.getMinutes());
        if (minutes.length < 2) {
            return this.starts_at.getHours() + ':0' + minutes;
        } else {
            return this.starts_at.getHours() + ':' + minutes;
        }      
    }

    get stringyEnd() {
        let minutes = String(this.ends_at.getMinutes());
        if (minutes.length < 2) {
            return this.ends_at.getHours() + ':0' + minutes;
        } else {
            return this.ends_at.getHours() + ':' + minutes;
        }      
    }

    get formatEnd() {
        let minutes = String(this.ends_at.getMinutes());
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }  
        let month = String(this.ends_at.getMonth()+1);
        if (month.length < 2) {
            month = '0'+month;
        }   
        let day = String(this.ends_at.getDate());
        if (day.length < 2) {
            day = '0'+day;
        } 
        let hour = String(this.ends_at.getHours());
        if (hour.length < 2) {
            hour = '0'+hour;
        }
        return this.ends_at.getFullYear() +'-'+ month +'-'+ day +'T'+ hour +':'+ minutes
    }

    get formatStart() {
        let minutes = String(this.starts_at.getMinutes());
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }  
        let month = String(this.starts_at.getMonth()+1);
        if (month.length < 2) {
            month = '0'+month;
        }   
        let day = String(this.starts_at.getDate());
        if (day.length < 2) {
            day = '0'+day;
        } 
        let hour = String(this.starts_at.getHours());
        if (hour.length < 2) {
            hour = '0'+hour;
        }
        return this.starts_at.getFullYear() +'-'+ month +'-'+ day +'T'+ hour +':'+ minutes
    }
}