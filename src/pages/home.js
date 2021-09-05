import { useEffect } from "react"

import HomeComponent from '../components/home'

export default function Home() {
    useEffect(() => {
        document.title = 'FilmApp'
    }, [])

    return <HomeComponent />
}