import { setUserData, clearUserData, getUserData } from '../util.js';
import {addMenuShopAndList, createMenu, createShopList, addWeeklyMenu, userData } from './data.js';


export const settings = {
    host: '',
    appId: '',
    apiKey: '',
    apiMasterKey: '',
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.error);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        throw err;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': settings.appId,
            'X-Parse-REST-API-Key': settings.apiKey,
            'X-Parse-Master-Key': settings.apiMasterKey
        }
    };

    const user = getUserData();
    if (user) {
        options.headers['X-Parse-Session-Token'] = user.sessionToken;
    }
    if(method === 'get'){
        options.headers['X-Parse-Revocable-Session'] =1;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}

export async function login(username, password) {
    const result = await post(settings.host + '/login', { username, password });
    const user = await userData(result.objectId);
    const menu = user.menuId;
    const shopList = user.shopListId;
    setUserData(user, menu, shopList);

    return result;
}

export async function register(email, username, password) {
    const result = await post(settings.host + '/users', {
        email,
        username,
        password,
    });
    const data = await addMenuShopAndList(result.objectId);
    const user = await userData(result.objectId);
    user.sessionToken = result.sessionToken;
    const menu = user.menuId;
    const shopList = user.shopListId;
    setUserData(user, menu, shopList);
    return result;
}

export async function logout() {
    const result = post(settings.host + '/logout', {});

    clearUserData();

    return result;
}