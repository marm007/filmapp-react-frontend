
export const filmPlaylistInitialState = {
    playlist: null,
    currentFilm: null,
    currentFilmIndex: 0,
    isLoading: true,
    headerHeight: null,
    playerHeight: null
}

export const filmPlaylistReducer = (state, action) => {
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
                isLoading: false,
                playlist: action.playlist,
                currentFilm: action.currentFilm,
                currentFilmIndex: action.currentFilmIndex
            }
        }
        case 'clear': {
            return { ...filmPlaylistInitialState }
        }
        case 'remove-film': {
            return {
                ...state,
                currentFilm: action.payload === state.currentFilm ? null : state.currentFilm,
                currentFilmIndex: action.payload === state.currentFilm ? 0 : state.currentFilmIndex - 1,
                playlist: {
                    ...state.playlist,
                    films: state.playlist.films.filter(film => film.id !== action.payload)
                }
            }
        }
        default:
            return state
    }
}