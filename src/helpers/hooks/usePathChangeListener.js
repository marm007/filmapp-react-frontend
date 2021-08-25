import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const usePathChangeListener = () => {
    let { pathname } = useLocation()

    useEffect(() => {
        if (!pathname.includes('/profile'))
            window.scrollTo(0, 0)
    }, [pathname])

}
export default usePathChangeListener