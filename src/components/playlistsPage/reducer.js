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
                playlists: [...state.playlists, ...action.payload],
                isAllFetched: action.responseCount < 12 ,
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