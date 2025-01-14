import React, { useEffect } from 'react';
import { Header, Footer } from '../Components/Layout';
import { Home, NotFound } from '../Pages';
import { Route, Routes } from 'react-router-dom';
import AnimalTypes from '../Pages/AnimalTypes';
import SingIn from '../Pages/SignIn/SingIn';
import SingUp from '../Pages/SignUp/SingUp';
import { userAccountInterface } from '../Interfaces';
import { setLoggedInUser } from '../Store/Redux/userAccountSlice';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
    AccessDenied,
    AuthenticationTest,
    AuthenticationTestAdmin,
} from '../Pages/AuthTest';
import MyOfferDetails from '../Pages/Offer/MyOfferDetails';
import Offers from '../Pages/Offers/Offers';
import OfferDetails from '../Components/Page/Offers/OfferDetails';
import Animals from '../Pages/Animals';

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
        <div className="">
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/myOfferDetails/:offerId"
                        element={<MyOfferDetails />}
                    ></Route>
                    <Route
                        path="/offerDetails/:offerId"
                        element={<OfferDetails />}
                    ></Route>
                    <Route
                        path="/animmaltypes"
                        element={<AnimalTypes />}
                    ></Route>
                    <Route path="/animals" element={<Animals />}></Route>
                    <Route path="/signIn" element={<SingIn />}></Route>
                    <Route path="/signUp" element={<SingUp />}></Route>
                    <Route path="/offers" element={<Offers />}></Route>

                    <Route
                        path="/authentication"
                        element={<AuthenticationTest />}
                    ></Route>
                    <Route
                        path="/authorization"
                        element={<AuthenticationTestAdmin />}
                    ></Route>
                    <Route
                        path="/accessDenied"
                        element={<AccessDenied />}
                    ></Route>

                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
