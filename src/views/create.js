import { html } from '//unpkg.com/lit-html?module';
import { addWeeklyMenu, getIngredients, getMyMenu, getRecipe } from '../api/data.js';


const createTemplate = (onClick, hasMenu) => html`
<div @click=${onClick} class="card-container">
    <div class="popup" style="display:${hasMenu? 'block': 'none'}">
        <div class="popup-container">
            <p>You already have a menu! Do you want to see it?</p>
            <ul class="buttons">
                <li class="popup-yes">Yes</li>
                <li class="popup-no">No</li>
            </ul>
            <a href="#0" class="popup-close">&times</a>
        </div>
    </div>
    <h1>Choose Weekly Menu:</h1>
    <p>Choose your option and Cook planner will create a weekly menu for you.</p>
    <div class="cards">
        <div class="card">
            <h1>Medium Pack</h1>
            <div class="card-content">
                <h3><i class="fas fa-carrot"></i> 3 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 3 Meals</h3>
            </div>
            <a href="/menu" class="button" disabled=${hasMenu ? 'true' : '' } id="three">Choose</a>
        </div>
        <div class="card">
            <h1>Hungry Pack</h1>
            <div class="card-content six">
                <h3><i class="fas fa-carrot"></i> 6 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 6 Meals</h3>
            </div>
            <a href="/menu" class="button" disabled=${hasMenu ? 'true' : '' } id="six">Choose</a>
        </div>
    </div>
</div>
`;

export async function createPage(ctx) {
    const menuId = sessionStorage.getItem('menuId');
    const shopListId = sessionStorage.getItem('shopListId');
    const menu = await getMyMenu(menuId);
    const hasMenu = Boolean(menu);
    const popUp = document.querySelector('.popup');

    ctx.render(createTemplate(onClick, hasMenu));
    ctx.userNav();

    async function onClick(event) {
        event.preventDefault();
        const click = event.target;
        let count;
        if (click.className === 'button' && !click.getAttribute('disabled')) {
            if (click.id === 'three') {
                count = 3;
            }
            else if (click.id === 'six') {
                count = 6;
            }
            const meals = await getRecipe('meal', count);
            const starters = await getRecipe('starter', count);
            await addWeeklyMenu(menuId, { meals, starters });
            getIngredients(shopListId, meals, starters);
            ctx.page.redirect('/menu');
        }
        else if (['popup-no', 'popup-close'].includes(event.target.className) ||
            !document.querySelector('.popup').contains(event.target)) {
                document.querySelector('.popup').style.display = 'none';
        }
        else if (['popup-yes'].includes(event.target.className)){
            ctx.page.redirect('/menu');
        }
    }

}

