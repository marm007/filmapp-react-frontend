import { useReducer } from "react"
import FilmContext from "./filmContext"

const filmInitialState = {
    isPreviewLoaded: false,
    comments: null,
    commentsCount: null,
    playerHeight: null,
    reloadPlaylist: false,
    error: null
}

const filmReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'success': {
            return {
                ...state,
                isPreviewLoaded: true,
                comments: action.comments,
                commentsCount: action.commentsCount,
                error: null
            }
        }
        case 'reset-comments': {
            return {
                ...state,
                comments: null,
                commentsCount: null
            }
        }
        default:
            return state
    }
}

const FilmProvider = ({ children }) => {
    const [filmState, filmDispatch] = useReducer(filmReducer, filmInitialState)


    return (
        <FilmContext.Provider value={[filmState, filmDispatch]}>
            {children}
        </FilmContext.Provider>
    );
}

export default FilmProvider