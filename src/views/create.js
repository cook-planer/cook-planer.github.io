import { html } from '//unpkg.com/lit-html?module';
import { getAllRecipe } from '../api/data.js'

const createTemplate = () => html`
<div class="card-container">
    <h1>Choose Weekly Menu:</h1>
    <p>Choose your option and Cook planner will create a weekly menu for you.</p>
    <div class="cards">
        <div class="card">
            <h1>Medium Pack</h1>
            <div class="card-content">
                <h3><i class="fas fa-carrot"></i> 3 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 3 Meals</h3>
            </div>
            <a href="/menu" class="button">Choose</a>
        </div>
        <div class="card">
            <h1>Hungry Pack</h1>
            <div class="card-content">
                <h3><i class="fas fa-carrot"></i> 6 Starters</h3>
                <h3><i class="fas fa-drumstick-bite"></i> 6 Meals</h3>
            </div>
            <a href="/menu" class="button">Choose</a>
        </div>
    </div>
</div>
`;

export async function createPage(ctx) {
    ctx.render(createTemplate());
    ctx.userNav();
}

