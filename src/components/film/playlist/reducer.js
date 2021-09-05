
export const filmPlaylistInitialState = {
    playlist: null,
    currentFilm: null,
    currentFilmIndex: 0,
    isLoading: false,
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
            return filmPlaylistInitialState
        }
        case 'remove-film': {
            return {
                ...state,
                removingFilmId: action.payload,
                isRemovingFilm: true
            }
        }
        case 'remove-film-success': {

            const filtered = state.playlist.films.filter(film => film.id !== action.payload)
            return {
                ...state,
                currentFilm: action.payload === state.currentFilm ? null : state.currentFilm,
                currentFilmIndex: action.payload === state.currentFilm ? 0 : filtered.findIndex(film => film.id === state.currentFilm) + 1,
                playlist: {
                    ...state.playlist,
                    films: filtered
                },
                isRemovingFilm: false,
            }
        }
        case 'change-playlist-privacy-success': {
            return {
                ...state,
                playlist: { ...state.playlist, is_public: action.payload.is_public }
            }
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}