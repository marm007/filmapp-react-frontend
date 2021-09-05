export const initialSearchState = {
    options: [],
    isLoading: false,
    isAllLoaded: false,
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
                isAllLoaded: action.payload.length < 10,
                options: [...state.options, ...action.payload]
            }
        }
        case 'success-search': {
            return {
                ...state,
                isLoading: false,
                isSearching: false,
                isAllLoaded: action.payload.length < 10,
                options: action.payload
            }
        }
        case 'clear': {
            return initialSearchState
        }
        case 'load': {
            return !state.isLoading && !state.isAllLoaded ? {
                ...state,
                isLoading: true,
                isAllLoaded: false,
                isSearching: false,
            } : state
        }
        case 'search': {
            return {
                ...state,
                options: [],
                isSearching: true,
                isLoading: false,
                isAllLoaded: false
            }
        }
        default: return state
    }
}