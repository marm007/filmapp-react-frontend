import { createContext } from 'react';
const UserContext = createContext({ name: '', id: null, auth: false });
export default UserContext