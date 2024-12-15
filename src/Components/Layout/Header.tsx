import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../Store/Redux/store';
import { userAccountInterface } from '../../Interfaces';
import {
    emptyUserState,
    setLoggedInUser,
} from '../../Store/Redux/userAccountSlice';
let logo = require('../../Assets/Images/main.png');

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // login user data
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <NavLink className="nav-link" to="/">
                        <img
                            src={logo}
                            style={{ height: '40px' }}
                            className="m-1"
                            alt="mainJPG"
                        />
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/sth">
                                    something else
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Admin Panel
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <a
                                        className="dropdown-item"
                                        href="animmaltypes"
                                    >
                                        animmaltypes
                                    </a>
                                    <a className="dropdown-item" href="##">
                                        Another action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/authentication"
                                >
                                    Authentication
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/authorization"
                                >
                                    Authorization
                                </NavLink>
                            </li>
                            <div
                                className="d-flex"
                                style={{ marginLeft: 'auto' }}
                            >
                                {userData.Email && (
                                    <>
                                        <li className="nav-item">
                                            <button
                                                className="nav-link active"
                                                style={{
                                                    cursor: 'pointer',
                                                    border: 'none',
                                                    background: 'transparent',
                                                }}
                                                //onClick={handleLogout}
                                            >
                                                Welcome, {userData.FirstName}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                                                style={{
                                                    border: 'none',
                                                    height: '40px',
                                                    width: '100px',
                                                }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                )}

                                {!userData.Email && (
                                    <>
                                        <li className="nav-item text-white">
                                            <NavLink
                                                className="nav-link"
                                                to="/signUp"
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item text-white">
                                            <NavLink
                                                className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                                                style={{
                                                    border: 'none',
                                                    height: '40px',
                                                    width: '100px',
                                                }}
                                                to="/signIn"
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
