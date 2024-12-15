import React from 'react';

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const accessToken = localStorage.getItem('token'); // if token is present - user loged in
        if (!accessToken) {
            window.location.replace('/signIn');
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
