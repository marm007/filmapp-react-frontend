export const updatePlaylistInitialState = {
    title: '',
    initialPlaylist: {
        title: ''
    },
    isInitialLoaded: false,
    isSumbitted: false,
    isSending: false,
    isError: false,
    error: '',
    isSuccess: false,
}

export const updatePlaylistReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                error: '',
                isError: false,
                [action.fieldName]: action.payload
            }
        }
        case 'initial-success': {
            return {
                ...state,
                isInitialLoaded: true,
                title: action.payload,
                initialPlaylist: {
                    title: action.payload
                }
            }
        }
        case 'submit': {
            return {
                ...state,
                isSumbitted: true,
                isError: false,
                error: ''
            }
        }
        case 'send': {
            return {
                ...state,
                isSending: true
            }
        }
        case 'success': {
            return {
                ...state,
                isSuccess: true,
                isSending: false,
                isSumbitted: false,
                isError: false,
                error: ''
            }
        }
        case 'error': {
            return {
                ...state,
                isSuccess: false,
                isSending: false,
                isSumbitted: false,
                isError: true,
                error: action.payload ? action.payload : ''
            }
        }
        default: {
            return state
        }
    }
}