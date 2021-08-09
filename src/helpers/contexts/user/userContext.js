import { createContext } from 'react';
const UserContext = createContext({ name: '', id: null, auth: false, isInitialLoaded: false });
export default UserContext