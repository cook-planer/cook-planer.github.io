import * as api from './api.js';


const host = 'https://parseapi.back4app.com';
//const host = 'http://localhost:3000';
api.settings.host = host;
api.settings.appId = 'vf5jI3Jexv004fLVyCtEbvoy4DdNJ4wNhaS5bD76';
api.settings.apiKey = 'JipcDtkNNtRrSppK5xdywmx1hggj0rt9M2gBrwG9';
api.settings.apiMasterKey = '85OMHd4lmojocdIET0qJURZLUJaLArtCQgv1QlE8';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}
export async function userData(id) {
    return await api.get(host + '/users/' + id)
}

export async function addMenuShopAndList(id) {
    const data = {
        menuId: await createMenu(),
        shopListId: await createShopList(),
    }
    return await api.put(host + '/users/' + id, data)
}
export async function createRecipe(recipe) {
    return await api.post(host + '/classes/Recipe', recipe);
}

export async function createMenu() {
    const result = await api.post(host + '/classes/menu', {});
    return createPointer('menu', result.objectId);
}
export async function createShopList() {
    const result = await api.post(host + '/classes/shopList', {});
    return createPointer('shopList', result.objectId);
}
export async function getRecipe(type_meal, size) {
    const data = await api.get(host + `/aggregate/Recipe?match={"type":"${type_meal}"}&sample={"size":${size}}`);
    return data.results;
}

export async function getMyMenu(id) {
    const data = await api.get(host + `/classes/menu/${id}`);
    return data;
}
export async function getMyShopList(id) {
    return await api.get(host + `/classes/shopList/${id}`);
}
export async function addWeeklyMenu(id, data) {
    await api.put(host + `/classes/menu/${id}`, data)

}


export async function getIngredients(id, meals, starters) {
    const menu = {};
    for (let meal of meals) {
        for (let ing of meal.ingredient) {
            const [product, quantity] = Object.values(ing);
            if(!menu.hasOwnProperty(product)){
                menu[product] = 0;
            }
            menu[product] += Number(quantity);
        }
    }
    for (let starter of starters) {
        for (let ing of starter.ingredient) {
            const [product, quantity] = Object.values(ing);
            if(!menu.hasOwnProperty(product)){
                menu[product] = 0;
            }
            menu[product] += Number(quantity);
        }
    }
    await api.put(host + '/classes/shopList/' + id, {products:menu});

}




