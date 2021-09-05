import { useState, useEffect } from 'react'
import UserContext from './userContext';
import jwt_decode from "jwt-decode";
import usePathChangeListener from '../../hooks/use-path-change-listener';

const UserProvider = ({ children }) => {

    usePathChangeListener()
    
    const [user, setUser] = useState({ name: '', id: null, auth: false, isInitialLoaded: false });
    
    useEffect(() => {
        function getMe() {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                setUser(user => ({ ...user, isInitialLoaded: true }))
                return
            }
            const decoded = jwt_decode(token);
            setUser(() => ({
                name: decoded.name,
                auth: true,
                id: decoded.id,
                isInitialLoaded: true
            }));
        }
        getMe()
    }, [])

    const login = (name, id, token, refreshToken) => {
        localStorage.setItem('accessToken', JSON.stringify(token));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

        setUser(() => ({
            name: name,
            auth: true,
            id: id,
            isInitialLoaded: true
        }));
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');


        setUser((user) => ({
            ...user,
            name: '',
            auth: false,
            id: null
        }));
    };

    const updateUser = (accessToken) => {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));

        const decoded = jwt_decode(accessToken);
        setUser((user) => ({
            ...user,
            name: decoded.name
        }));

        window.location.reload();
    }

    const clearUser = () => {
        setUser((user) => ({
            ...user,
            isInitialLoaded: false
        }));
    }

    return (
        <UserContext.Provider value={{ user, login, logout, clearUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider