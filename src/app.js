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
    const hamburger = document.querySelector('.hamburger');
    if (user) {
        userView.style.display = 'flex';
        guestView.style.display = 'none';
        //hamburger.style.display = 'block';
    }
    else {
        userView.style.display = 'none';
        guestView.style.display = 'block';
        hamburger.style.display = 'none';
    }
}
//hamburger 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".contentNav");
const navContent = document.querySelector("nav");
const pageContent = document.querySelector("body");

pageContent.addEventListener("click", event => Menu(event));

function Menu(event){
    if(['hamburger', 'bar'].includes(event.target.className)){
        hamburger.className.split().includes('active') ? closeMenu() : activeMenu();
    }
    else if(['nav-link'].includes(event.target.className)){
        closeMenu();
    }
    else if(!navContent.contains(event.target)){
        closeMenu();
    }
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

function activeMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

