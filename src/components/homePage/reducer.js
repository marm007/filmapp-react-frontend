export const homePageReducer = (state, action) => {
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
                films: [...state.films, ...action.payload],
                isLoading: false,
                isAllFetched: action.payload.length < 12,
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
    films: [],
    isLoading: true,
    isAllFetched: false,
    error: '',
}