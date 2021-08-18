export const initialSearchState = {
    options: [],
    isLoading: false,
    isAllFetched: false,
    isSearching: false,
    isOpen: false,
    selected: null,
    title: ''
}

export function searchReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                selected: null,
                [action.fieldName]: action.payload
            }
        }
        case 'pick-option': {
            return {
                ...state,
                title: action.title,
                selected: action.selected
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
        case 'clear': {
            return initialSearchState
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
                options: [],
                isSearching: true,
                isLoading: false,
                isAllFetched: false
            }
        }
        default: return state
    }
}