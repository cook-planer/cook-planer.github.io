import { getMyShopList } from '../api/data.js';
import { html } from '//unpkg.com/lit-html?module';

const groceryTemplate = (onClick, products) => html`
    <div class="shop-container">
        <h1><i class="fas fa-shopping-basket"></i>Shoping List:</h1>
        <div @click=${onClick} class="shoping-card">
            ${products.map(item)}
        </div>
    </div>
`;

const item = (data) => html`
<div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>${data[0]}</span> <span
        class="quantity">${data[1]} qty.</span></div>
`;

export async function groceryListPage(ctx) {
    const shopListId = sessionStorage.getItem('shopListId')
    const data = await getMyShopList(shopListId);
    const products = Object.entries(data.products)
    ctx.render(groceryTemplate(onClick, products));
    ctx.userNav();

    function onClick(event) {
        event.preventDefault();
        const parentElement = event.target.parentElement;
        const iElement = parentElement.firstChild;
        if (parentElement.className === 'product') {
            parentElement.classList.add('done');
            iElement.classList.replace('fa-check', 'fa-times');

        }
        else if (parentElement.className === 'product done') {
            parentElement.classList.remove('done');
            iElement.classList.replace('fa-times', 'fa-check');
        }

    }

}