export * from './auth-headers';
export * from './history'

export const checkIfPlaylistButtonClick = (target) => {
    console.log(target)
    if ((target.tagName === 'path' && target.parentNode.className.animVal && target.parentNode.className.animVal.includes('playlist-add-icon')) ||
        (target.tagName === 'svg' && target.className.animVal && target.className.animVal.includes('playlist-add-icon')) ||
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