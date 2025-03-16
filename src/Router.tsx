import { createBrowserRouter } from 'react-router-dom';
import { Home, NotFound } from './Pages';
import React from 'react';
import MyOfferDetails from './Pages/Offers/MyOfferDetails';
import OfferDetails from './Pages/Home/OfferDetails';
import AnimalTypes from './Pages/AnimalTypes';
import Applications from './Pages/Applications';
import Animals from './Pages/Animals';
import SingIn from './Pages/SignIn/SingIn';
import SingUp from './Pages/SignUp/SingUp';
import Offers from './Pages/Offers/Offers';
import App from './App';
import { isAuth } from './Utils/authUtils';
import SupportPage from './Pages/Support/Support';
import EmailVerify from './Pages/Verify/Verify';
import Users from './Pages/Users';
import TermsAndConditions from './Pages/TermsAndConditions/TermsAndConditions';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/myOfferDetails/:offerId',
                element: <MyOfferDetails />,
                loader: isAuth,
            },
            {
                path: '/offerDetails/:offerId',
                element: <OfferDetails />,
            },
            {
                path: '/animmaltypes',
                element: <AnimalTypes />,
                // loader: isManagerOrAdmin,
            },
            {
                path: '/users',
                element: <Users />,
                // loader: isAdmin,
            },
            {
                path: '/applications',
                element: <Applications />,
                loader: isAuth,
            },
            {
                path: '/animals',
                element: <Animals />,
                loader: isAuth,
            },
            {
                path: '/signIn',
                element: <SingIn />,
            },
            {
                path: '/signUp',
                element: <SingUp />,
            },
            {
                path: '/verify',
                element: <EmailVerify />,
            },
            {
                path: '/offers',
                element: <Offers />,
                loader: isAuth,
            },
            {
                path: '/support',
                element: <SupportPage />,
            },
            {
                path: '/termsAndConditions',
                element: <TermsAndConditions />,
            },
            {
                path: '/401',
                element: <NotFound />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
