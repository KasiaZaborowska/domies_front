import React, { useEffect } from 'react';
import { Header } from '../Components/Layout';
import { Outlet } from 'react-router-dom';
import { userAccountInterface } from '../Interfaces';
import { setLoggedInUser } from '../Store/Redux/userAccountSlice';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // get the token - stay log in after refresh
        const localToken = localStorage.getItem('token');
        if (localToken) {
            const { Email, FirstName, LastName, Role }: userAccountInterface =
                jwt_decode(localToken);
            dispatch(setLoggedInUser({ Email, FirstName, LastName, Role }));
        }
    });
    return (
        <>
            <ToastContainer />
            <div className="">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;
