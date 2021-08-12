import { pageInitialMaxFetchCount, pageMaxFetchCount } from "../../config"

export const initialState = {
    films: null,
    isLoading: false,
    isAllFetched: false,
    isInitialLoaded: false,
    error: null,
}

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
        case 'initial-load': { 
            return {
                ...state,
                films: [...new Set([...action.payload])],
                isLoading: false,
                isInitialLoaded: true,
                isAllFetched: action.payload.length < pageInitialMaxFetchCount,
            }
        }
        case 'success': {
            return {
                ...state,
                films: [...new Set([...state.films, ...action.payload])],
                isLoading: false,
                isAllFetched: action.payload.length < pageMaxFetchCount,
                error: null
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