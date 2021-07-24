export const checkIfPlaylistButtonClick = (target) => {
    console.log(target)
    if ((target.tagName === 'path' && target.parentNode.className.animVal && target.parentNode.className.animVal.includes('playlist-add-icon')) ||
        (target.tagName === 'svg' && target.className.animVal && target.className.animVal.includes('playlist-add-icon')) ||
        (target.className && typeof target.className === 'string' && target.className.includes('playlist-add-icon-holder')))
        return true
    return false
}

export const displayCommentDate = (comment) => {
    let date = new Date(Date.parse(comment.createdAt));
    let time = (('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getFullYear()).slice(-2)
        + ' o ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2))
    return time;
};

export const parseSearchDate = (film) => {

    let date = new Date(Date.parse(film.createdAt));
    let today = new Date();


    let time = Math.abs(Math.floor((
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes()) -
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes()))
        / (1000 * 60)));

    if (time / 60 >= 1) {
        time /= 60;

        if (time / 24 >= 1) {

            time /= 24;

            if (time / 30 >= 1) {

                time /= 30;

                if (time / 12 >= 1) {

                    time = time / 12;
                    time = Math.floor(time) + ' years ';

                } else {
                    time = Math.floor(time) + ' months ';
                }

            } else {
                time = Math.floor(time) + ' days ';
            }

        } else {
            time = Math.floor(time) + ' hours ';
        }
    } else {
        time = Math.floor(time) + ' minutes ';
    }

    time = time + 'ago';

    return time;
};
