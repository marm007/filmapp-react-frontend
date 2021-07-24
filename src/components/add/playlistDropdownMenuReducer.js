
export const playlistDropdownMenuInitialState = {
    playlists: [],
    isLoading: true,
    isAllFetched: false,
    isCreating: false,
    isAdding: false,
    playlistToUpgrade: null,
    title: '',
    error: '',
}

export function playlistDropdownMenuReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                isError: '',
                [action.fieldName]: action.payload
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllFetched: false,
            }
        }
        case 'load-success': {
            return {
                ...state,
                playlists: [...state.playlists, ...action.payload],
                isLoading: false,
                isAllFetched: action.payload < 10,
                error: '',
            }
        }
        case 'create': {
            return {
                ...state,
                isLoading: false,
                isCreating: true
            }
        }
        case 'add': {
            return {
                ...state,
                isLoading: false,
                isAdding: true,
                playlistToUpgrade: action.payload
            }
        }
        case 'add-success': {
            return state.playlistToUpgrade ? {
                ...state,
                isAdding: false,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === state.playlistToUpgrade.id) return { ...playlist, contains: !playlist.contains }
                    else return playlist
                }),
                playlistToUpgrade: null
            } : state
        }
        case 'error':
            return {
                ...state,
                isLoading: false,
                isAllFetched: false,
                error: action.payload,
                title: ''
            }
        default:
            return state

    }
}
