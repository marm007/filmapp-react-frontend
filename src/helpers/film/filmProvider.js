import { useState } from "react"
import FilmContext from "./filmContext"

const FilmProvider = ({ children }) => {
    const [filmData, setFilmData] = useState({ reloadPlaylist: false, error: null, comments: null })

    const onData = (fieldName, payload) => {
        setFilmData((filmData) => ({
            ...filmData,
            [fieldName]: payload
        }))
    }

    const clear = () => {
        setFilmData(() => ({
            reloadPlaylist: false, 
            error: null, 
            comments: null
        }))
    }
    return (
        <FilmContext.Provider value={{ filmData, onData, clear }}>
            {children}
        </FilmContext.Provider>
    );
}

export default FilmProvider