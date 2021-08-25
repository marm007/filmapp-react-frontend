export const updateFilmInitialState = {
    title: '',
    description: '',
    initialFilm: {
        title: '',
        description: ''
    },
    isInitialLoaded: false,
    isSumbitted: false,
    isSending: false,
    isError: false,
    error: '',
    isSuccess: false,
}

export const updateFilmReducer = (state, action) => {
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
                title: action.title,
                description: action.description,
                initialFilm: {
                    title: action.title,
                    description: action.description
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