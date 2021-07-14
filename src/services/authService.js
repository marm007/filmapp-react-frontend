import axios from '../helpers/axios'

export const login = (data) => axios.post('auth', {}, {
    auth: {
        username: data.email,
        password: data.password
    }
})
export const forget = (form) => axios.post('auth/password/forgot', form)
export const reset = (token, form) => axios.post(`auth/password/reset/${token}`, form)