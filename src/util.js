function notify(errorText){
    document.querySelector('.msg').textContent = errorText;
    document.querySelectorAll('input').forEach(i=> i.style.border='solid 1px red');
}

function getUserData() {
    const user = sessionStorage.getItem('sessionToken');
    if (user) {
        return user;
    } else {
        return undefined;
    }
}

function setUserData(user, menu, shopList) {
    sessionStorage.setItem('sessionToken', user.sessionToken)
    sessionStorage.setItem('objectId', user.objectId);
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('menuId', menu.objectId);
    sessionStorage.setItem('shopListId', shopList.objectId);

}

function clearUserData() {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('objectId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('menuId');
    sessionStorage.removeItem('shopListId');
}

export {
    getUserData,
    setUserData,
    clearUserData,
    notify
};