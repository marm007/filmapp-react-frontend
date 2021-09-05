import { useEffect } from 'react'
import PlaylistsComponent from '../components/playlists'

export default function Playlists() {

    useEffect(() => {
        document.title = "Playlists - FilmApp"
    }, [])

    return <PlaylistsComponent />
}