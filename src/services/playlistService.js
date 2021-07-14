import axios from '../helpers/axios'
import { authHeader } from '../helpers/auth-headers'

export const create = (body) => axios.post('playlists', body, { headers: authHeader() } )
export const index = (id) => axios.get(`playlists/${id}`)
export const show = () => axios.get(`playlists`)
export const partialUpdate = (id, body) => axios.patch(`playlists/${id}`, body, { headers: authHeader() })



