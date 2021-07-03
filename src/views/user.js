import { html } from '//unpkg.com/lit-html?module';
import { login, register } from '../api/data.js';
import { notify } from '../util.js';


const loginTemplate = (onSubmit) => html`
<div @submit=${onSubmit} class="login-page">
    <div class="form">
        <form class="login-form">
            <h1>Sign In</h1>
            <p class="msg"></p>
            <input name="username" type="text" placeholder="username" />
            <input name="password" type="password" placeholder="password" />
            <input class="button" type="submit" value="Sign In"/>
            <p class="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
    </div>
</div>
`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        if (!username || !password) {
            notify('Error: All fields must be field.');
            return false;
        }
        try{
            await login(username, password);
            ctx.userNav();
            ctx.page.redirect('/menu');
        }catch(err){
            document.querySelector('input[type=password]').value = '';
            notify(err);
        }
    }
}

const registerTemplate = (onSubmit) => html`
<div class="login-page">
    <div class="form">
        <form @submit=${onSubmit} class="register-form">
            <h1>Sign Up</h1>
            <p class="msg"></p>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <input type="text" name="email" placeholder="email address" />
            <input class="button" type="submit" value="Sign Up"/>
            <p class="message">Already registered? <a href="/login">Sign In</a></p>
        </form>
    </div>
</div>
`;

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username'); 
        const email = formData.get('email');
        const password = formData.get('password');
        if (!email || !password || !username) {
            notify('Error:All fields must be field.');
            return false;
        }
        try{
            await register(email, username, password);
            ctx.page.redirect('/menu');
        }catch(err){
            notify(err);
        }
    }
}