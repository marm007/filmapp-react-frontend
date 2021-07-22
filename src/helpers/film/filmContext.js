import { createContext } from 'react'
const FilmContext = createContext({ reloadPlaylist: false, error: null, comments: null });
export default FilmContext