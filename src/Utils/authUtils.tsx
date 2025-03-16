import jwt_decode from 'jwt-decode';
import { redirect } from 'react-router-dom';

const getRole = (): string | undefined => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        const userRole: {
            Role: string;
        } = jwt_decode(accessToken);
        return userRole.Role.toLowerCase();
    } else {
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

export const isAuthBoolean = (): boolean => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
        return false;
    }
    return true;
};

export const isAuth = (): Response | null => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
        return redirect('/signIn');
    }
    return null;
};
