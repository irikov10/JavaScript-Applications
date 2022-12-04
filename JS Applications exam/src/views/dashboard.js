import { getAllAlbums } from '../api/data.js'
import { html, render } from '../lib.js'

const dashboardTemplate = (musicAlbums) => html`
<section id="dashboard">
        <h2>Albums</h2>
        <!-- Display a li with information about every post (if any)-->
        ${musicAlbums.length ? html`<ul class="card-wrapper">${musicAlbums.map(m => html`<li class="card">
              <img src="${m.imageUrl}" alt="travis" />
              <p>
                <strong>Singer/Band: </strong><span class="singer">${m.singer}</span>
              </p>
              <p>
                <strong>Album name: </strong><span class="album">${m.album}</span>
              </p>
              <p><strong>Sales:</strong><span class="sales">${m.sales}</span></p>
              <a class="details-btn" href="/details/${m._id}">Details</a>
          </li>`)}}</ul>` : html`<h2>There are no albums added yet.</h2>`}
</section>`

export async function showDashboard(ctx) {
    const music = await getAllAlbums();
    render(dashboardTemplate(music), document.querySelector('main'))
}