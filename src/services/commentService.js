import axios from '../helpers/axios'
import { authHeader } from '../helpers/auth-headers'

export const all = (film_id, params) => axios.get(`films/${film_id}/comments`, {params})

export const create = (film_id, form) => axios.post(`films/${film_id}/comments`, form, {headers: authHeader()})

export const update = (id, update) => axios.put(`comments/${id}`, update, {headers: authHeader()})


