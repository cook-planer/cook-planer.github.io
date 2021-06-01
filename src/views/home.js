import { getUserData } from '../util.js';
import { html } from '//unpkg.com/lit-html?module';


const homeTemplate = () => html`
        <div class="first-page">
            <img src="/static/Images/first-page.jpg" style="width: 100%; height: 90vh; filter: brightness(50%)">
            <div class="center-text">
                <h1>Make your weekly menu</h1>
                <a href="/login" class="button">Login</a>
            </div>
        </div>
`;


export async function homePage(ctx) {
    const user = getUserData();
    if (user){
        ctx.page.redirect('/create');
    }
    ctx.render(homeTemplate());
    ctx.userNav();
}