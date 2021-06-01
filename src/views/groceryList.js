import { html } from '//unpkg.com/lit-html?module';

const groceryTemplate = (onClick) => html`
    <div class="shop-container">
        <h1><i class="fas fa-shopping-basket"></i>Shoping List:</h1>
        <div @click=${onClick} class="shoping-card">
            <div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>Breed1</span> <span
                    class="quantity">7 qty.</span></div>
            <div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>Breed</span> <span
                    class="quantity">7 qty.</span></div>
            <div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>Breed</span> <span
                    class="quantity">7</span></div>
            <div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>Breed</span> <span
                    class="quantity">7</span></div>
            <div class="product-wrapper"><span class="product"><i class="fas fa-check"></i>Breed</span> <span
                    class="quantity">7</span></div>
    
        </div>
    </div>
`;

export async function groceryListPage(ctx) {
    ctx.render(groceryTemplate(onClick));
    ctx.userNav();

    function onClick(event) {
        event.preventDefault();
        const parentElement = event.target.parentElement;
        if (parentElement.className === 'product') {
            parentElement.classList.add('done');
        }
        else if (parentElement.className === 'product done'){
            parentElement.classList.remove('done');
        }

    }

}