import { useState, useEffect } from 'react'
import UserContext from './userContext';
import jwt_decode from "jwt-decode";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', id: null, auth: false });

    useEffect(() => {
        function getMe() {
            const token = localStorage.getItem('accessToken')
            if (!token) return
            const decoded = jwt_decode(token);
            setUser(() => ({
                name: decoded.name,
                auth: true,
                id: decoded.id
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
            id: id
        }));
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');


        setUser(() => ({
            name: '',
            auth: false,
            id: null
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider