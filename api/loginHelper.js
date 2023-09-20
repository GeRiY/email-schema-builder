export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null') {
        return token;
    } else {
        return null;
    }
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const setUsername = (username) => {
    localStorage.setItem('username', username);
}

export const getUsername = () => {
    return localStorage.getItem('username') || null;
}

export const setLoginDumyData = (data) => {
    localStorage.setItem('loginDumyData', JSON.stringify(data));
}

export const getLoginDumyData = () => {
    return JSON.parse(localStorage.getItem('loginDumyData')) || null;
}

export const saveStorageUser = (user) => {
    localStorage.setItem(process.env.storageUserSecret, JSON.stringify(user));
}

export const getStorageUser = () => {
    return JSON.parse(localStorage.getItem(process.env.storageUserSecret)) || null;
}