const url = 'http://localhost:3030/jsonstore/collections/books';
const loadButton = document.getElementById('loadBooks');
const submitButton = document.querySelector('form button');
console.log(submitButton)
const tBody = document.getElementsByTagName('tbody')[0];
const form = document.getElementsByTagName('form')[0];
const h3 = document.querySelector('form h3');
loadButton.addEventListener('click', loadAllBooks);
submitButton.addEventListener('click', createBook);


async function loadAllBooks() {
    try {
        let response = await fetch(url);

        if(response.status !== 200) {
            throw new Error('Problem with loading data');
        }

        let data = await response.json();

        let entries = Object.entries(data);
        tBody.innerHTML = '';

        for(let [key, {author, title}] of entries) {
            let tr = document.createElement('tr');
            let titleTd = document.createElement('td');
            titleTd.textContent = title;
            let authorTd = document.createElement('td');
            authorTd.textContent = author;

            tr.appendChild(titleTd)
            tr.appendChild(authorTd);

            let newTdElement = document.createElement('td');
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            editButton.addEventListener('click', editBook);
            deleteButton.addEventListener('click', remove);

            newTdElement.appendChild(editButton);
            newTdElement.appendChild(deleteButton);

            tr.appendChild(newTdElement);
            tBody.appendChild(tr);

            function remove(e) {

                e.preventDefault();
                fetch(`${url}/${key}`, {
                    method: 'DELETE'
                })

                tr.remove()
            }

            function editBook(e) {
                fetch(`${url}/${key}`)
                .then(response => {

                    if(!response.ok) {
                        throw new Error('Cannot edit the book');
                    }

                    return response.json()
                })
                .then(data => {
                    
                    h3.textContent = 'Edit FORM';
                    submitButton.textContent = 'Save';
                    
                    document.querySelector('[name="title"]').value = e.target.parentNode.parentNode.children[0].textContent;
                    
                    document.querySelector('[name="author"]').value = e.target.parentNode.parentNode.children[1].textContent;
                    tr.replaceChildren()
                    
                })
            }
        }

    } catch (error) {
        alert(error);
    }
}

async function createBook() {
    const authorElement = document.querySelector('[name="author"]').value;
    const titleElement = document.querySelector('[name="title"]').value;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: authorElement,
                title: titleElement
            })
        })
    
        if(response.status !== 200) {
            throw new Error('Cannot create book');
        }
    
        return response.json();
    } catch (error) {
        alert(error)
    }
}