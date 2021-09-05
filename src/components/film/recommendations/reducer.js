import { recommendationsMaxFetchCount } from "../../../config"

export const recommendationsInitialState = {
    films: null,
    isLoading: false,
    isAllLoaded: false,
    isInitialLoaded: false,
    error: null,
}

export function recommendationsReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'clear': {
            return recommendationsInitialState
        }
        case 'initial-success': {
            return {
                ...recommendationsInitialState,
                isInitialLoaded: true,
                films: action.payload
            }
        }
        case 'load': {
            return !state.isLoading && !state.isAllLoaded && state.isInitialLoaded && !state.error ? {
                ...state,
                isLoading: true,
                isAllLoaded: false
            } : state
        }
        case 'success': {
            return {
                ...state,
                films: [...state.films, ...action.payload],
                isLoading: false,
                isAllLoaded: action.payload.length < recommendationsMaxFetchCount
            }
        }
        case 'error': {
            return {
                ...recommendationsInitialState,
                error: action.payload
            }
        }
        default: return state
    }
}
