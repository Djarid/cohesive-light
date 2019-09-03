const eventList = document.querySelector('#event-list');
const createEventButton = document.querySelector('button#createEvent');
const newEvent = document.querySelector('div#newEvent');

const raidhook = 'https://discordapp.com/api/webhooks/612695091701612569/RlnlmVFfJYCOjHK6ZrAxe9FjwNA-HEes13SV5y_S3H7p36bHTzX97tq8kDkRmiyPLlh5';

createEventButton.addEventListener('click', function() {
    newEvent.classList.remove('hidden');
});



function renderEvent(doc) {
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'event-entry');

    li.appendChild(renderEventItem('Event', doc.data().type + ': ' + doc.data().name));
    li.appendChild(renderEventItem('Date', doc.data().date.toDate()));
    li.appendChild(renderEventItem('Leader', doc.data().raid_leader));
    li.appendChild(renderEventItem('Duration', doc.data().duration));
    li.appendChild(renderEventItem('Level', doc.data().level));
    li.appendChild(renderEventItem('Team Selection', doc.data().team_selection));
    li.appendChild(renderEventItem_multiline('Description', doc.data().description));
    li.appendChild(renderEventItem('Signed Up', doc.data().sign_ups));

    return li;
}

function renderEventItem(key, value) {
    let div = document.createElement('div');
    let label = document.createElement('span');
    let content = document.createElement('span');

    div.setAttribute('class', 'event-item');
    label.setAttribute('class', 'event-key');
    content.setAttribute('class', 'event-value');

    label.textContent = key;
    content.textContent = value;

    div.appendChild(label);
    div.appendChild(content);

    return div;
}

function renderEventItem_multiline(key, value) {
    let div = document.createElement('div');
    let label = document.createElement('span');
    let content = document.createElement('span');

    div.setAttribute('class', 'event-item');
    label.setAttribute('class', 'event-key');
    content.setAttribute('class', 'event-value');

    label.textContent = key;
    value.forEach(elm => {
        let p = document.createElement('p');
        p.setAttribute('class', 'event-value-item');
        p.textContent = elm;
        content.appendChild(p);
    });

    div.appendChild(label);
    div.appendChild(content);

    return div;
}

db.collection('events').orderBy('date').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            eventList.appendChild(renderEvent(change.doc));
        } else if (change.type == 'removed') {
            let li = eventList.querySelector('[data-id="' + change.doc.id + '"]');
            eventList.removeChild(li);
        } else if (change.type == 'modified') {
            let li = eventList.querySelector('[data-id="' + change.doc.id + '"]');
            while (li.firstChild) {
                li.removeChild(li.firstChild);
            }
            let ren =  renderEvent(change.doc);
            eventList.replaceChild(ren,li);
        }


    });
});