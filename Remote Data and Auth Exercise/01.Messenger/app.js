function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const textArea = document.getElementById('messages');
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh'); 

    refreshButton.addEventListener('click', displayComment);
    sendButton.addEventListener('click', addComment);

    function addComment() {

        let authorName = document.querySelector('input[name="author"]').value;
        let content = document.querySelector('input[name="content"]').value;

        if(!authorName || !content) {
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                author: authorName,
                content: content,
            })
        })
            .then(res => res.json())
            .catch(error => alert(error))

            displayComment()
    }

    function displayComment() {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let values = Object.values(data);
                let comments = [];
              
                values.forEach(value => {
                    let author = value.author;
                    let content = value.content;
                    
                    comments.push(`${author}: ${content}`);
                    textArea.value = comments.join('\n')
                })
            })
            .catch(error => alert(error))
    }
}

attachEvents();