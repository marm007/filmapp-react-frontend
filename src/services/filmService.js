import axios from '../helpers/axios'
import authHeader from '../helpers/auth-header'


export const all = (params) => axios.get('films/', {params})
export const index = (id) => axios.get(`films/${id}`)
export const indexDetails = (id) => axios.get(`films/${id}/details`)
export const search = (params) => axios.get('films/search', {params})

export const view = (id) => axios.patch(`films/${id}/view`)

export const video = (id) => axios.get(`films/${id}/video`)
export const thumbnail = (id, params) => axios.get(`films/${id}/thumbnail`, {params})

export const create = (form) => axios.post(`films`, form, {headers: authHeader()})

export const update = (id, body) => axios.put(`films/${id}`, body, {headers: authHeader()})
export const partialUpdate = (id, body) => axios.patch(`films/${id}`, body, {headers: authHeader()})

export const like = (id, form) => axios.patch(`films/${id}/action`, form, {headers: authHeader()})

export const remove = (id) => axios.delete(`films/${id}`, { headers: authHeader() })



