import createContext from 'react';


// Todo load from localstorage if available

export const UserContext = createContext({
    name: 'Anonymous'
})

export default UserContext;