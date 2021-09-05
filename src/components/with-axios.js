import { useContext, useMemo } from 'react'
import { refresh } from '../services/authService';
import axios from '../helpers/axios'
import UserContext from '../contexts/user/userContext';

const WithAxios = ({ children }) => {

    const { logout } = useContext(UserContext);

    useMemo(() => {
        axios.interceptors.response.use((response) => {
            return response
        }, (error) => {
            const isAuth = localStorage.getItem('accessToken')
            const originalRequest = error.config

            if (error.response && error.response.status === 401 && isAuth && !originalRequest._retry) {
                if (error.config.url === 'auth/refresh') {
                    logout()
                    return Promise.reject(error)
                }
                originalRequest._retry = true
                return refresh({ "refreshToken": JSON.parse(localStorage.getItem("refreshToken")) })
                    .then(res => {
                        if (res.status === 201) {
                            const accessToken = res.data.token
                            localStorage.setItem('accessToken', JSON.stringify(accessToken))
                            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken
                            return axios(originalRequest)
                        }
                    })
            }
            return Promise.reject(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return children
}

export default WithAxios