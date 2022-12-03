function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', submitComment);
    refreshBtn.addEventListener('click', loadComments);
}

const url = 'http://localhost:3030/jsonstore/messenger';

function submitComment() {
    let authorName = document.querySelector('[name="author"]');
    let content = document.querySelector('[name="content"]');

    if(!authorName.value || !content.value) {
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: authorName.value,
            content: content.value
        })
    })
        .then(response => {

            if(!response.ok) {
                throw new Error('Error creating a new message');
            }
            
            return response.json();
        })
        .catch(err => alert(err));

        authorName.value = '';
        content.value = '';
}

function loadComments() {
    fetch(url)
        .then(response => {

            if(!response.ok) {
                throw new Error('Error');
            }

            return response.json()
        })
        .then(data => {
            const textArea = document.getElementById('messages');
            let comments = [];
            Object.values(data).forEach(element => comments.push(`${element.author}: ${element.content}`));
            textArea.value = comments.join('\n');
        })
        .catch(error => alert(error))
}

attachEvents();