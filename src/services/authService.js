import authHeader from '../helpers/auth-header'
import axios from '../helpers/axios'

export const login = (data) => axios.post('auth', {}, {
    auth: {
        username: data.email,
        password: data.password
    }
})
export const register = (form) => axios.post('users', form)

export const refresh = (data) => axios.post('auth/refresh', data, {headers: authHeader()})
export const forget = (form) => axios.post('auth/password/forgot', form)
export const reset = (token, form) => axios.post(`auth/password/reset/${token}`, form)