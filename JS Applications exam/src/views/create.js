import { createAlbum } from '../api/data.js';
import { html, page, render } from '../lib.js';

const createTemplate = (onCreate) => html`
<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form" @submit="${onCreate}">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
</section>`

export async function showCreate(ctx) {
    render(createTemplate(onCreate), document.querySelector('main'));

    async function onCreate(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);
        if(!singer || !album || !imageUrl || !release || !label || !sales) {
            return alert('All fields are required');
        }

        await createAlbum({ singer, album, imageUrl, release, label, sales });
        page.redirect('/dashboard')
    }
}