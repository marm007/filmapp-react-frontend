import { useState } from 'react'
import NavbarContext from './navbarContext'

const NavbarProvider = ({ children }) => {

    const [navbarData, setNavbarData] = useState({ isExpanded: false })

    const toggle = () => {
        setNavbarData({ ...navbarData, isExpanded: !navbarData.isExpanded })
    }

    return (
        <NavbarContext.Provider value={{ navbarData, toggle }} >
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider