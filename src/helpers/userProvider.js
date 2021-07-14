import { useState, useEffect } from 'react'
import UserContext from './userContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', auth: false });

    useEffect(() => {
        
        const name = localStorage.getItem('user')
        const token = localStorage.getItem('accessToken')

        setUser((user) => ({
            name: name === null ? '' : name ,
            auth: token !== null,
        }));
        
    }, [])

    const login = (name, token) => {
        localStorage.setItem('accessToken', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(name));
        setUser(() => ({
            name: name,
            auth: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider