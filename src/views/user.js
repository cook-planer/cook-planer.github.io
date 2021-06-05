import { html } from '//unpkg.com/lit-html?module';
import { login, register } from '../api/data.js';


const loginTemplate = (onSubmit) => html`
<div @submit=${onSubmit} class="login-page">
    <div class="form">
        <form class="login-form">
            <h1>LOGIN</h1>
            <input name="username" type="text" placeholder="username" />
            <input name="password" type="password" placeholder="password" />
            <button>login</button>
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
        const username = formData.get('username');
        const password = formData.get('password');
        if (!username || !password) {
            return alert('All fields must be field');
        }
        await login(username, password);
        ctx.userNav();
        ctx.page.redirect('/');

    }
}

const registerTemplate = (onSubmit) => html`
<div class="login-page">
    <div class="form">
        <form @submit=${onSubmit} class="register-form">
            <h1>REGISTER</h1>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <input type="text" name="email" placeholder="email address" />
            <button>create</button>
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
            return alert('All fields must be field');
        }

        await register(email, username, password);

        ctx.page.redirect('/');
    }


}