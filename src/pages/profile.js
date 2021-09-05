import { useEffect } from 'react'
import ProfileComponent from '../components/profile'

export default function Profile() {

    useEffect(() => {
        document.title = "Profile - FilmApp"
    }, [])

    return <ProfileComponent />

}