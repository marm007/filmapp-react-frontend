const userInitialState = {
    name: '',
    email: ''
}

export const settingsInitialState = {
    ...userInitialState,
    password: '',
    initialUser: userInitialState,
    isInitialLoaded: false,
    isSubmitted: false,
    isSending: false,
    error: '',
    isSuccess: false,
    success: '',
}

export const settingsReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                error: '',
                [action.fieldName]: action.payload
            }
        }
        case 'initial-success': {
            return {
                ...state,
                email: action.email,
                name: action.name,
                initialUser: {
                    email: action.email,
                    name: action.name
                },
                isInitialLoaded: true
            }
        }
        case 'submit': {
            return {
                ...state,
                isSubmitted: true,
                error: null,
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
                isSubmitted: false,
                isSending: false,
                isSuccess: true,
                success: action.payload ? action.payload : 'Changes saved successfully!',
                error: null
            }
        }
        case 'error': {
            return {
                ...state,
                isSending: false,
                isSubmitted: false,
                isSuccess: false,
                error: action.payload
            }
        }
        default: return state
    }
}