import { playlistsMaxFetchCount } from '../../config'

export const playlistsPageReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false,
                error: ''
            }
        }
        case 'success': {
            return {
                ...state,
                isLoading: false,
                playlists: new Set([...state.playlists, ...action.payload]),
                isAllFetched: action.responseCount < playlistsMaxFetchCount ,
                playlistsCount: state.playlistsCount + action.responseCount,
                error: ''
            }
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

export const initialState = {
    playlists: [],
    playlistsCount: 0,
    isLoading: true,
    isAllFetched: false,
    error: '',
}