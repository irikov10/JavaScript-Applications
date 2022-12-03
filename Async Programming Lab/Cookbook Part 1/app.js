async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const recipes = await response.json();
    return Object.values(recipes)
}

async function getRecipesById(id) {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);
    const recipe = response.json();
    return recipe;
}

function createRecipePreview(recipe) {
    const article = document.createElement('article');
    article.classList.add('preview');

    const divTitle = document.createElement('div');
    div.classList.add('title');

    let h2 = document.createElement('h2');
    h2.textContent = 'Title';

    const divImg = document.createElement('div');
    divImg.classList.add('small');

    const img = document.createElement('img');
    img.src = recipe.img;

    divTitle.appendChild(h2);
    divImg.appendChild(img);
    article.appendChild(divTitle);
    article.appendChild(divImg);

    article.addEventListener('click', toggleRecipe);

    return article;

    async function toggleRecipe() {
        const fullRecipe = await getRecipesById(recipe._id);

        article.replaceChild(createRecipe(fullRecipe));
    }

}

window.addEventListener('load', async () => {
    const main = document.querySelector('main');

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    main.innerHTML = '';

    cards.forEach((card) => main.appendChild(card));
})

function createRecipe(recipe) {
    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = 'Title';

    const divContainer = document.createElement('div');
    divContainer.classList.add('band');

    const divImg = document.createElement('div');
    divImg.classList.add('thumb');
    const img = document.createElement('img');
    img.src = recipe.img;

    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.classList('ingredients');
    const h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:'
    const ul = document.createElement('ul');
    recipe.ingredients.map((ingredient) => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ul.appendChild(li);
    })

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    const prepH3 = document.createElement('h3');
    prepH3.textContent = 'Preparation:';
    divDescription.appendChild(prepH3);
    recipe.steps.map((step) => {
        const p = document.createElement('p');
        p.textContent = step;
        divDescription.appendChild(p);
    });

    divImg.appendChild(img);
    ingredientsDiv.appendChild(h3);
    img.appendChild(ul);
    divContainer.appendChild(divImg);
    divContainer.appendChild(ingredientsDiv);
    article.appendChild(h2);
    article.appendChild(divContainer);
    article.appendChild(descriptionDiv);

    return article;
}