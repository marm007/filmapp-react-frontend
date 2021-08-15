import { pageInitialMaxFetchCount, pageMaxFetchCount  } from '../../../config'


export const initialState = {
    playlists: null,
    playlistsCount: 0,
    isLoading: false,
    isAllFetched: false,
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
                isAllFetched: action.responseCount < pageInitialMaxFetchCount,
                playlistsCount: state.playlistsCount + action.responseCount,
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false,
                error: null
            }
        }
        case 'success': {
            return {
                ...state,
                playlists: [...new Set([...state.playlists, ...action.playlists])],
                isLoading: false,
                isAllFetched: action.responseCount < pageMaxFetchCount,
                playlistsCount: state.playlistsCount + action.responseCount,
                error: null
            }
        }
        case 'clear': {
            return initialState
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                isAllFetched: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}
