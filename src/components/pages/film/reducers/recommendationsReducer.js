import { recommendationsMaxFetchCount } from "../../../../config"

export const recommendationsInitialState = {
    films: null,
    isLoading: false,
    isAllFetched: false,
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
                films: action.films,
                isInitialLoaded: true
            }
        }
        case 'load': {

            return {
                ...state,
                isLoading: true,
                isAllFetched: false
            }
        }
        case 'success': {
            return {
                ...state,
                films: [...state.films, ...action.payload],
                isLoading: false,
                isAllFetched: action.payload.length < recommendationsMaxFetchCount
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
