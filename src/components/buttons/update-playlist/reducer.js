import { playlistButtonMaxFetchCount } from "../../../config"

export const playlistDropdownMenuInitialState = {
    playlists: [],
    isLoading: true,
    isAllLoaded: false,
    isCreating: false,
    isAdding: false,
    playlistToUpgrade: null,
    title: '',
    isPublic: false,
    error: '',
}

export function playlistDropdownMenuReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                error: '',
                [action.fieldName]: action.payload
            }
        }
        case 'load': {
            return {
                ...state,
                isLoading: true,
                isAllLoaded: false,
            }
        }
        case 'load-success': {
            return {
                ...state,
                playlists: [...state.playlists, ...action.payload],
                isLoading: false,
                isAllLoaded: action.payload.length < playlistButtonMaxFetchCount,
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
        case 'create-success': {
            return {
                ...state,
                isLoading: false,
                isCreating: false
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
        case 'add-update-playlist': {
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === state.playlistToUpgrade.id) return { ...playlist, contains: !playlist.contains }
                    else return playlist
                }),
                playlistToUpgrade: null
            }
        }
        case 'add-success': {
            return {
                ...state,
                isAdding: false
            }
        }
        case 'change-playlist-privacy-success': {
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.id) return { ...playlist, is_public: action.payload.is_public }
                    return playlist
                })
            }
        }
        case 'error':
            return {
                ...state,
                isLoading: false,
                isCreating: false,
                error: action.payload,
                title: ''
            }
        default:
            return state

    }
}
