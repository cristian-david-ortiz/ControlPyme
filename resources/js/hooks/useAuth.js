export const useAuth = () => {
    return {
        token: localStorage.getItem('token'),
    };
};
