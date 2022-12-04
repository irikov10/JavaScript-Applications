import { editAlbum, getById } from '../api/data.js';
import { html, page, render } from '../lib.js';

const editTemplate = (m, onEdit) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit="${onEdit}">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${m.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" value=${m.album}/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${m.imageUrl}/>
            <input type="text" name="release" id="album-release" placeholder="Release date" value=${m.release}/>
            <input type="text" name="label" id="album-label" placeholder="Label" value=${m.label}/>
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${m.sales}/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>`

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const music = await getById(id);
    render(editTemplate(music, onEdit), document.querySelector('main'));

    async function onEdit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let { singer, album, imageUrl, release, label, sales } = Object.fromEntries(formData);
        if(!singer || !album || !imageUrl || !release || !label || !sales) {
            return alert('All fields are required');
        }

        await editAlbum(id, { singer, album, imageUrl, release, label, sales });
        page.redirect('/details/' + id)
    }
}