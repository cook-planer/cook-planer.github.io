import * as api from './api.js';


const host = 'https://parseapi.back4app.com';
//const host = 'http://localhost:3000';
api.settings.host = host;
api.settings.appId = 'vf5jI3Jexv004fLVyCtEbvoy4DdNJ4wNhaS5bD76';
api.settings.apiKey = 'JipcDtkNNtRrSppK5xdywmx1hggj0rt9M2gBrwG9';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;



export async function createRecipe(recipe) {
    return await api.post(host + '/classes/Recipe', recipe);
}

export async function getAllRecipe(){
    return await api.get(host + '/classes/Recipe')
}




