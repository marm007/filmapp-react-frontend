export const initialProfileState = {
    data: [],
    isLoading: true,
    isAllFetched: false,
    error: null,
    filmsCount: 0,
    playlistsCount: 0,
}

export function profileReducer(state, action) {
    switch(action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case 'success': {
            return {
                ...state,
                isLoading: false,
                isAllFetched: action.filmsCount < 10 && action.playlistsCount < 10,
                filmsCount: state.filmsCount + action.filmsCount,
                playlistsCount: state.playlistsCount + action.playlistsCount,
                data: [...state.data, ...action.data]
            }
        }
        case 'load': {

            return !state.isLoading && !state.isAllFetched ?
            {...state, isLoading: true, isAllFetched: false} :
            state
        }
        default: return state
    }
}