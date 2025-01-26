import jwt_decode from 'jwt-decode';

const getRole = (): string | undefined => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        const userRole: {
            Role: string;
        } = jwt_decode(accessToken);
        return userRole.Role.toLowerCase();
    } else {
        //console.error('Brak tokenu!');
        return undefined;
    }
};

export const isUser = (): boolean => {
    return getRole() === 'user';
};

export const isAdmin = (): boolean => {
    return getRole() === 'admin';
};

export const isManager = (): boolean => {
    return getRole() === 'manager';
};

export const isManagerOrAdmin = (): boolean => {
    console.log(getRole());
    return getRole() === 'manager' || getRole() === 'admin';
};
