import { html } from '//unpkg.com/lit-html?module';
import { addWeeklyMenu, getIngredients, getMyMenu, getRecipe } from '../api/data.js';


const createTemplate = (onClick) => html`
<div @click=${onClick} class="card-container">
    <h1>Choose Weekly Menu:</h1>
    <p>Choose your option and Cook planner will create a weekly menu for you.</p>
    <div class="cards">
        <div class="card">
            <h1>Medium Pack</h1>
            <div class="card-content">
                <h3><i class="fas fa-carrot"></i> 3 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 3 Meals</h3>
            </div>
            <a href="/menu" class="button" id="three">Choose</a>
        </div>
        <div class="card">
            <h1>Hungry Pack</h1>
            <div class="card-content six">
                <h3><i class="fas fa-carrot"></i> 6 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 6 Meals</h3>
            </div>
            <a href="/menu" class="button" id="six">Choose</a>
        </div>
    </div>
</div>
`;

export async function createPage(ctx) {
    const menuId = sessionStorage.getItem('menuId');
    const shopListId = sessionStorage.getItem('shopListId');
    const menu = await getMyMenu(menuId);
    if (menu !== undefined) {
        ctx.page.redirect('/menu');
    }
    ctx.render(createTemplate(onClick));
    ctx.userNav();

    async function onClick(event) {
        event.preventDefault();
        const btn = event.target;
        let count;
        if (btn.className === 'button') {
            if (btn.id === 'three') {
                count = 3;
            }
            else if (btn.id === 'six') {
                count = 6;
            }
            const meals = await getRecipe('meal', count);
            const starters = await getRecipe('starter', count);
            await addWeeklyMenu(menuId, { meals, starters });
            getIngredients(shopListId, meals, starters);
            ctx.page.redirect('/menu');
        }
    }

}

