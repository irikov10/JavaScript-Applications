import { logout } from './api/user.js';
import { page, render } from './lib.js';
import { updateNav } from './utils.js';
import { showCreate } from './views/create.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

page('/', showHome)
page('/dashboard', showDashboard)
page('/create', showCreate)
page('/login', showLogin)
page('/register', showRegister)
page('/details/:id', showDetails)
page('/edit/:id', showEdit)

page.start();

updateNav()

let logoutButton = document.querySelector('div.user > a:nth-child(2)');
logoutButton.addEventListener('click', () => {
    logout();
    page.redirect('/dashboard');
    updateNav();
})