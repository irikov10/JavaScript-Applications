function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', createContacts);
    document.querySelector('#phonebook').addEventListener('click', remove);
}

const url = 'http://localhost:3030/jsonstore/phonebook';

function loadContacts() {
    const phoneBook = document.getElementById('phonebook');

    fetch(url)
        .then(response => {

            if(!response.ok) {
                throw new Error('Cannot find the phonebook');
            }

            return response.json();
        })
        .then(data => {
            phoneBook.replaceChildren();
            Object.values(data).forEach(value => {
                const liElement = document.createElement('li');
                liElement.textContent = `${value.person}: ${value.phone}`;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.setAttribute('id', value._id);

                liElement.appendChild(deleteBtn);
                phoneBook.appendChild(liElement);
            })
        })
}

function createContacts(){
    let person = document.getElementById('person').value;
    let phoneNumber = document.getElementById('phone').value;

    if(!person || !phoneNumber){
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            person: person,
            phone: phoneNumber,
        })
    })
        .then(response => {

            if(!response.ok) {
                throw new Error('Cannot find the contact');
            }

            return response.json();
        })
        .catch(error => alert(error));

        person = '';
        phoneNumber = '';
}

function remove(e) {
    let currentId = e.target.id;

    if(e.target.textContent === 'Delete') {
        fetch(`${url}/${currentId}`, {
            method: 'DELETE'
        })
            .then(response => {
                loadContacts()
                return response.json()
            })
            .catch(error => {
                alert(error)
            })
    }
}

attachEvents();