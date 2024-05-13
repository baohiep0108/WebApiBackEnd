
const AuthIdUser = () => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication"];
        }
    }
    return null;
};

export default AuthIdUser;
