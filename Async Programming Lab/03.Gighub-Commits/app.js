function loadCommits() {
    // Try it with Fetch API
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
}

function handleResponse(response) {
    if(response.ok == false) {
        throw new Error(`Error: ${response.status} Not Found`);
    }

    return response.json();
}

function handleData(data) {
    const list = document.getElementById('commits');

    const items = data.map(item => {
        const li = document.createElement('li');
        li.textContent = `${item.commit.author.name}: ${item.commit.message}`;

        return li;
    })

    list.replaceChildren(...items)
}

function handleError(error) {
    const list = document.getElementById('commits');
    list.textContent = error.message;
}