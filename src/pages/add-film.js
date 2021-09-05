import { useEffect } from 'react'
import AddFilmComponent from '../components/add-film'

export default function AddFilm() {

    useEffect(() => {
        document.title = "Add film"
    }, [])

    return <AddFilmComponent />
}