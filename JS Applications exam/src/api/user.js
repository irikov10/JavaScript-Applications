import { get, post } from "./api.js";
import { clearUserData } from "../utils.js";

export async function login(email, password) {
    const user = await post('/users/login', { email, password });

    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    const user = await post('/users/register', { email, password });

    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    get('/users/logout');
    clearUserData()
}