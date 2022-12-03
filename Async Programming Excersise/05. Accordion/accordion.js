async function solution() {
    try {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error obtaining article list');
        }

        let data = await response.json();

        data.forEach(articleInfo => {
            const article = document.createElement('div');
            article.classList.add('accordion');

            article.innerHTML = `
                <div class="head">
                    <span>${articleInfo.title}</span>
                    <button class="button" id="${articleInfo._id}" onclick="moreOnclick(event)">More</button>
                </div> 
                   
                <div class="extra"></div>
                `

            let main = document.getElementById('main');
            main.appendChild(article)
        })

    } catch (error) {

    }
}

async function moreOnclick(ev) {
    try {   
        let currentTarget = ev.currentTarget;
        let parent = currentTarget.parentNode.parentNode;
        let extraDiv = parent.querySelector('div.extra');

        let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`);
        let data = await response.json();

        extraDiv.innerHTML = `<p>${data.content}</p>`

        if(currentTarget.textContent === 'More') {
            currentTarget.textContent = 'Less';
            extraDiv.style.display = 'block';
        } else {
            currentTarget.textContent = 'More';
            extraDiv.style.display = 'none';
        }
    } catch (error) {

    }
}

solution()