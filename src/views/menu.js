import { getMyMenu } from '../api/data.js';
import { html } from '//unpkg.com/lit-html?module';

const menuTeplate = (meals, starters) => html`
<div class="menu-content">
    <h1>Weekly Menu:</h1>
    <div class="menu">
        ${meals.length === 0 || starters.length === 0 ?
            html`<h2>You have not menu yet.</h2>
        <a class="button" href="/create">Create</a>` :
            myMenuTamplate(starters, meals)
        }
    </div>
</div>
`;

const myMenuTamplate = (starter, meal) => html`
    <div class="starter">
        <h2>Starters:</h2>
        <div class="dish-container">
        ${starter.map(cardTemplate)}
        </div>
    </div>
    <div class="meal">
        <h2>Meals:</h2>
        <div class="dish-container">
        ${meal.map(cardTemplate)}
        </div>
    </div>
`;


const cardTemplate = (data) => html`
<div class="card-table">
    <div class="food-card">
        <h3><i class="fas fa-check"></i>${data.name}</h3>
        <img src="${data.imgUrl}" alt="" style="width:140px;height:120px;">
    </div>
</div>
`;

export async function menuPage(ctx) {
    const menuId = sessionStorage.getItem('menuId')
    const menu = await getMyMenu(menuId);
    ctx.render(menuTeplate(menu.starters, menu.meals));
    ctx.userNav();
}