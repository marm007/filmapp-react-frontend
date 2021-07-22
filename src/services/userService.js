import { config } from '../config'
import axios from '../helpers/axios'
import authHeader from '../helpers/authHeader'


export const me = (params) => axios.get('users/me', {params, headers: authHeader()})

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {

    let loginHeaderMy =  null

    const requestOptions = {
        method: 'POST',
        headers: loginHeaderMy

    };

    return fetch(`${process.env.REACT_APP_API_URL}/users/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}

function logout(){
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/users/`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok){
            if(response.status === 401){
                logout();
            }
            const error = (data && data.errors) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

