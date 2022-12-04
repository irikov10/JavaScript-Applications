import { register } from '../api/user.js';
import { html, page, render } from '../lib.js'
import { updateNav } from '../utils.js';

const registerTemplate = (onRegister) => html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit="${onRegister}">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`

export async function showRegister(ctx) {
    render(registerTemplate(onRegister), document.querySelector('main'));

    async function onRegister(e) {
      e.preventDefault();

      let formData = new FormData(e.currentTarget);
      let email = formData.get('email');
      let password = formData.get('password');
      let repeatPassword = formData.get('re-password');

      if(email == '' || password == '' || repeatPassword == '') {
        return alert('All fields are required');
      }

      if(password != repeatPassword) {
        return alert('Passwords do not match');
      }

      await register(email, password);
      updateNav()
      page.redirect('/dashboard')
    }
}