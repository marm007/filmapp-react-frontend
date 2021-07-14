export * from './auth-headers';
export * from './history'

export const checkIfPlaylistButtonClick = (target) => {
    if (target.tagName === 'path' || target.tagName === 'svg' ||
        (target.className && typeof target.className === 'string' && target.className.includes('playlist-add-icon-holder')))
        return true
    return false
}
/* 
export const isLoggedIn = () => {
    if (localStorage.getItem('token') === null){
        return false;
    }

    if (moment().isAfter(getExpiration())) {
        return false;
    } else {
        return  true;
    }
}; */