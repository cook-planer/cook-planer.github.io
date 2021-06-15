import page from '//unpkg.com/page/page.mjs';
import { html, render } from '//unpkg.com/lit-html?module';


import { logout as apiLogout } from './api/data.js'
import { getUserData } from "./util.js"
import { homePage } from './views/home.js';
import { loginPage, registerPage } from './views/user.js';
import { createPage } from './views/create.js';
import { groceryListPage } from './views/groceryList.js';
import { menuPage } from './views/menu.js';
import { createRecipe } from './api/data.js';



const main = document.querySelector('main');

document.getElementById('logout').addEventListener('click', logout);


page('/', renderMiddleware, homePage);
page('/home', renderMiddleware, homePage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/create', renderMiddleware, createPage);
page('/grocery-list', renderMiddleware, groceryListPage);
page('/menu', renderMiddleware, menuPage);
page();

function renderMiddleware(ctx, next) {
    userNav();
    ctx.render = (content) => render(content, main);
    ctx.userNav = () => userNav();
    next();
}

async function logout() {
    await apiLogout();
    userNav();
    page.redirect('/');
}

function userNav() {
    const user = getUserData();
    const userView = document.querySelector('.user');
    const guestView = document.querySelector('.guest');

    if (user) {
        userView.style.display = 'block';
        guestView.style.display = 'none';

    }
    else {
        userView.style.display = 'none';
        guestView.style.display = 'block';
    }
}


