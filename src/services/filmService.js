import axios from '../helpers/axios'
import authHeader from '../helpers/authHeader'


export const all = (params) => axios.get('films/', {params})
export const index = (id) => axios.get(`films/${id}`)
export const search = (params) => axios.get('films/search', {params})

export const view = (id) => axios.patch(`films/${id}/view`)

export const video = (id) => axios.get(`films/${id}/video`)
export const thumbnail = (id, params) => axios.get(`films/${id}/thumbnail`, {params})

export const create = (form) => axios.post(`films`, form, {headers: authHeader()})

export const update = (id, form) => axios.put(`films/${id}`, form, {headers: authHeader()})
export const partialUpdate = (id, form) => axios.patch(`films/${id}`, form, {headers: authHeader()})

export const like = (id, form) => axios.patch(`films/${id}/action`, form, {headers: authHeader()})

export const remove = (id) => axios.delete(`films/${id}`, { headers: authHeader() })



