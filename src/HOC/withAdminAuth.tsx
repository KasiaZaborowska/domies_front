import React from 'react';
import jwt_decode from 'jwt-decode';

const withAdminAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const accessToken = localStorage.getItem('token') ?? '';

        if (accessToken) {
            const decode: {
                Role: string;
            } = jwt_decode(accessToken);
            if (decode.Role !== 'Admin') {
                window.location.replace('/accessDenied');
                return null;
            } else {
                window.location.replace('/signIn');
                return null;
            }
        }
        if (!accessToken) {
            window.location.replace('/signIn');
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};

export default withAdminAuth;
