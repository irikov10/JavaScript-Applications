import { login } from '../api/user.js';
import { html, page, render } from '../lib.js'
import { updateNav } from '../utils.js';

const loginTemplate = (onLogin) => html`
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit="${onLogin}">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
</section>`

export async function showLogin(ctx) {
    render(loginTemplate(onLogin), document.querySelector('main'));

    async function onLogin(e) {

      e.preventDefault();

      let formData = new FormData(e.currentTarget);
      let { email, password } = Object.fromEntries(formData);
      if(!email || !password) {
        return alert('All fields are required');
      }

      await login(email, password);
      updateNav()
      page.redirect('/dashboard')
    }
}