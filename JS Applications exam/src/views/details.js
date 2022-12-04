import { deleteById, getById } from '../api/data.js';
import { html, render, nothing } from '../lib.js'
import { getUserData } from '../utils.js';

const detailsTemplate = (m, user, onDelete) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${m.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${m.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${m.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${m.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${m.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${m.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            <a href="" id="like-btn">Like</a>
            ${user._id == m._ownerId ? html`
            <a href="/edit/${m._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click="${onDelete}">Delete</a>` : nothing}
          </div>
        </div>
      </section>
`

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const music = await getById(id);
    const user = JSON.parse(sessionStorage.getItem('user'));
    render(detailsTemplate(music, user, onDelete), document.querySelector('main'));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?');

        if(choice) {
            await deleteById(id);
            page.redirect('/dashboard');
        }
    }
}