import { pageInitialMaxFetchCount, pageMaxFetchCount } from '../../config'


export const initialState = {
    playlists: null,
    playlistsCount: 0,
    isLoading: false,
    isAllLoaded: false,
    isInitialLoaded: false,
    error: null,
}

export const playlistsPageReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'initial-success': {
            return {
                ...state,
                playlists: [...new Set([...action.playlists])],
                isLoading: false,
                isInitialLoaded: true,
                isAllLoaded: action.responseCount < pageInitialMaxFetchCount,
                playlistsCount: state.playlistsCount + action.responseCount,
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllLoaded: false,
                error: null
            }
        }
        case 'success': {
            return {
                ...state,
                playlists: [...new Set([...state.playlists, ...action.playlists])],
                isLoading: false,
                isAllLoaded: action.responseCount < pageMaxFetchCount,
                playlistsCount: state.playlistsCount + action.responseCount,
                error: null
            }
        }
        case 'user-logout': {
            return state.playlists ? {
                ...state,
                playlists: state.playlists.filter(playlist => playlist.is_public)
            } : state
        }
        case 'clear': {
            return initialState
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                isAllLoaded: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}
