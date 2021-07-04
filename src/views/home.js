import { getUserData } from '../util.js';
import { html } from '//unpkg.com/lit-html?module';


const homeTemplate = () => html`
        <div class="first-page">
            <img src="/static/Images/first-page.jpg">
            <div class="center-text">
                <h1>Make your weekly menu</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptas maiores, nihil esse nam
                    mollitia incidunt ad, asperiores earum corrupti totam ratione, itaque laboriosam reprehenderit et
                    sed? Quasi, eius provident!</p>
                <a href="/register" class="button">Get Started</a>
            </div>
        </div>
`;


export async function homePage(ctx) {
    const user = await getUserData();
    if (user) {
        ctx.page.redirect('/create');
    }
    else {
        ctx.render(homeTemplate());
        ctx.userNav();
    }
}