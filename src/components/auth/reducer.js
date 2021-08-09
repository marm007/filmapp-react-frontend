
export const authInitialState = {
    email: '',
    nick: '',
    password: '',
    isSubmitted: false,
    isSending: false,
    isSuccess: false,
    isError: false,
    error: null
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                isSubmitted: false,
                [action.fieldName]: action.payload
            }
        }
        case 'submit': {
            return {
                ...state,
                isError: false,
                error: null,
                isSubmitted: true
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
                isError: false,
                error: null,
                isSending: false,
                isSuccess: true
            }
        }
        case 'error': {
            return {
                ...state,
                isSending: false,
                isError: true,
                error: action.payload
            }
        }
        default: return state
    }
}