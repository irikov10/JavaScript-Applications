function loadRepos() {
	const username = document.getElementById('username').value;

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(handleData)
		.catch(handleError)
}

function handleResponse(response) {
	if(response.ok == false) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}

function handleData(data) {
	const list = document.getElementById('repos');

	const tasks = data.map(repo => {
		const li = document.createElement('li');
		const anchorTag = document.createElement('a');
		anchorTag.href = repo.html_url;
		anchorTag.textContent = repo.full_name;

		li.appendChild(anchorTag);

		return li;
	})

	list.replaceChildren(...tasks)
}

function handleError(error) {
	const list = document.getElementById('repos');
	list.textContent = error.message;
}