 const getUserRole = () => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        }
    }
    return null;
};
export default  getUserRole;