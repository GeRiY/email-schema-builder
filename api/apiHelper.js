import axios from "axios";
import {getToken, setToken} from "@/api/loginHelper";

const api = axios.create({
    baseURL: process.env.baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Language": "hu"
    }
});

const beforeUrl = '';

export const APIGET = async (url) => {
    try {
        api.defaults.headers['X-AUTH-TOKEN'] = `${getToken()}`;
        url = beforeUrl + url;
        const response = await api.get(url);
        if (response.status === 401) {
            setToken(null);
        }
        return response
    } catch (error) {
        if (error.response.status === 401) {
            setToken(null);
        }
        return error.response
    }
}

export const APIPOST = async (url, data) => {
    try {
        if (url !== 'auth/login') {
            api.defaults.headers['X-AUTH-TOKEN'] = `${getToken()}`;
            url = beforeUrl + url;
        } else {
            delete api.defaults.headers['X-AUTH-TOKEN']
        }
        const response = await api.post(url, data);
        if (response.status === 401) {
            setToken(null);
        }
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            setToken(null);
        }
        return error.response
    }
}

export const APIPUT = async (url, data) => {
    try {
        api.defaults.headers['X-AUTH-TOKEN'] = `${getToken()}`;
        url = beforeUrl + url;
        const response = await api.put(url, data);
        if (response.status === 401) {
            setToken(null);
        }
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(response);
            return null;
        }
    } catch (error) {
        if (error.response.status === 401) {
            setToken(null);
        }
    }
}

export const APIDELETE = async (url) => {
    try {
        api.defaults.headers['X-AUTH-TOKEN'] = `${getToken()}`;
        url = beforeUrl + url;
        const response = await api.delete(url);
        if (response.status === 401) {
            setToken(null);
        }
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(response);
            return null;
        }
    } catch (error) {
        if (error.response.status === 401) {
            setToken(null);
        }
    }
}

export const APIPATCH = async (url, data) => {
    try {
        api.defaults.headers['X-AUTH-TOKEN'] = `${getToken()}`;
        url = beforeUrl + url;
        const response = await api.patch(url, data);
        if (response.status === 401) {
            setToken(null);
        }
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(response);
            return null;
        }
    } catch (error) {
        if (error.response.status === 401) {
            setToken(null);
        }
    }
}