export function playlistMenuReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                isError: '',
                [action.fieldName]: action.payload
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false,
            }
        }
        case 'success': {
            return {
                ...state,
                playlists: action.payload,
                isAllFetched: action.count === 0,
                error: '',
                isLoading: false
            }
        }
        case 'error':
            return {
                ...state,
                isLoading: false,
                isAllFetched: false,
                error: 'Bad',
                title: ''
            }
        default:
            return state

    }
}

export const initialState = {
    playlists: [],
    isAllFetched: false,
    title: '',
    isLoading: true,
    error: '',
}