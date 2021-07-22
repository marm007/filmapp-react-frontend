export const initialSearchState = {
    options: [],
    isLoading: false,
    isAllFetched: false,
    isSearching: false,
    title: ''
}

export function searchReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'success-load': {
            return {
                ...state,
                isLoading: false,
                isSearching: false,
                isAllFetched: action.payload.length < 10,
                options: [...state.options, ...action.payload]
            }
        }
        case 'success-search': {
            return {
                ...state,
                isLoading: false,
                isSearching: false,
                isAllFetched: action.payload.length < 10,
                options: action.payload
            }
        }
        case 'load': {
            return !state.isLoading && !state.isAllFetched ? {
                ...state,
                isLoading: true,
                isAllFetched: false,
                isSearching: false,
            } : state
        }
        case 'search': {
            return {
                ...state,
                isSearching: true,
                isLoading: false,
                isAllFetched: false,
                title: action.payload
            }
        }
        default: return state
    }
}