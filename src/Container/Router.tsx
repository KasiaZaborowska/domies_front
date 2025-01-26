import { createBrowserRouter } from 'react-router-dom';
import { Home, NotFound } from '../Pages';
import React from 'react';
import MyOfferDetails from '../Pages/Offer/MyOfferDetails';
import OfferDetails from '../Components/Page/Offers/OfferDetails';
import AnimalTypes from '../Pages/AnimalTypes';
import Applications from '../Pages/Applications';
import Animals from '../Pages/Animals';
import SingIn from '../Pages/SignIn/SingIn';
import SingUp from '../Pages/SignUp/SingUp';
import Offers from '../Pages/Offers/Offers';
import {
    AccessDenied,
    AuthenticationTest,
    AuthenticationTestAdmin,
} from '../Pages/AuthTest';

export const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />,
    // },
    // {
    //     path: '/myOfferDetails/:offerId',
    //     element: <MyOfferDetails />,
    // },
    // {
    //     path: '/offerDetails/:offerId',
    //     element: <OfferDetails />,
    // },
    // {
    //     path: '/animmaltypes',
    //     element: <AnimalTypes />,
    // },
    // {
    //     path: '/applications',
    //     element: <Applications />,
    // },
    // {
    //     path: '/animals',
    //     element: <Animals />,
    // },
    // {
    //     path: '/signIn',
    //     element: <SingIn />,
    // },
    // {
    //     path: '/signUp',
    //     element: <SingUp />,
    // },
    // {
    //     path: '/offers',
    //     element: <Offers />,
    // },
    // {
    //     path: '/authentication',
    //     element: <AuthenticationTest />,
    // },
    // {
    //     path: '/authorization',
    //     element: <AuthenticationTestAdmin />,
    // },
    // {
    //     path: '/accessDenied',
    //     element: <AccessDenied />,
    // },
    // {
    //     path: '*',
    //     element: <NotFound />,
    // },
]);
