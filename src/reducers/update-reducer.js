export const updateInitialState = {
    update: {},
    initial: {},
    isInitialLoaded: false,
    isSumbitted: false,
    isSending: false,
    isSuccess: false,
    isError: false,
    error: '',
}

export const updateReducer = (state, action) => {
    switch (action.type) {
        case 'update': {
            return {
                ...state,
                error: '',
                isError: false,
                update: { ...state.update, [action.fieldName]: action.payload }
            }
        }
        case 'initial-success': {
            return {
                ...state,
                isInitialLoaded: true,
                update: action.payload,
                initial: action.payload
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