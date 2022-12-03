const url = 'http://localhost:3030/jsonstore/collections/students';
let table = document.querySelector('#results tbody');
let form = document.querySelector('form');

window.addEventListener('load', loadStudents);
form.addEventListener('submit', createStudents);

async function loadStudents() {
    try {
        let response = await fetch(url);

        if(response.status !== 200) {
            throw new Error('Cant fetch data');
        }

        let data = await response.json();

        Object.values(data).forEach(record => {
            let student = document.createElement('tr', createStudents('td', record.firstName),
            createStudents('td', record.firstName),
            createStudents('td', record.lastName),
            createStudents('td', record.facultyNumber),
            createStudents('td', record.grade),
            )

            table.appendChild(student)
        })    
    } catch(error) {
        alert(error.message)
    }
}

async function createStudents(e) {
   e.preventDefault();

    let formData = new FormData(form);
    let infoArray = [...formData.values()];
    let gradeNumber = Number(infoArray[3].trim())

    table.replaceChildren()

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: infoArray[0],
                lastName: infoArray[1],
                facultyNumber: infoArray[2],
                grade: gradeNumber
            })
        }) 

        if(!response.ok) {
            throw new Error('Error');
        }

        loadStudents
    } catch (error) {
        alert(error.message)
    }
}

function generator(type, ...content) {
    let element = document.createElement(type);

    content.forEach(e => {

        if(typeof e === 'number' || typeof e === 'string') {
            e = document.createTextNode(e)
        }
        element.appendChild(e)
    })
}