const authHeader = () => {

    let token = JSON.parse(localStorage.getItem('accessToken'));

    if(token){
        return { 'Authorization' : 'Bearer ' + token};
    } else{
        return {};
    }
}

export default authHeader