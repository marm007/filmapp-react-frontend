export const authHeader = () => {

    let token = JSON.parse(localStorage.getItem('accessToken'));

    if(token){
        return { 'Authorization' : 'Bearer ' + token};
    } else{
        return {};
    }
}

export const loginHeader = (username, password) => {
    let loginToken = window.btoa(username + ':' + password);
    return { 'Authorization':  'Basic ' +  loginToken };

}