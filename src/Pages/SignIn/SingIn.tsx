import React, { useState } from 'react';
import inputHelper from '../../Helper/inputHelper';
import { useLoginUserMutation } from '../../Apis/accountApi';
import { userAccountInterface } from '../../Interfaces';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../../Store/Redux/userAccountSlice';
import { RootState } from '../../Store/Redux/store';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';
import toastNotify from '../../Helper/toastNotify';

function SingIn() {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loginUser] = useLoginUserMutation();

    // const userAccountStore = useSelector(
    //     (state: RootState) => state.userAccountStore,
    // );
    // console.log('userAccountStore ', userAccountStore);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        Email: '',
        Password: '',
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response: any = await loginUser({
            Email: userInput.Email,
            Password: userInput.Password,
        });

        console.log(response);

        if (response.data) {
            console.log('if, data:', response);
            const token = response.data.token;
            console.log(token);
            const { Email, FirstName, LastName, Role }: userAccountInterface =
                jwt_decode(token);
            localStorage.setItem('token', token);
            dispatch(setLoggedInUser({ Email, FirstName, LastName, Role }));
            console.log(setLoggedInUser({ Email, FirstName, LastName, Role }));

            navigate('/');
            toastNotify('Logowanie zakończone sukcesem.');
        } else if (response.error) {
            console.log('error:', response.error.data.message);
            //setError(response.error.data.message);
            toastNotify(response.error.data.message, 'error');
        }

        setLoading(false);
    };

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="mt-5">Login</h1>
                <div className="mt-5" style={{ minWidth: '40vw' }}>
                    <div className="mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            required
                            name="Email"
                            value={userInput.Email}
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            name="Password"
                            value={userInput.Password}
                            onChange={handleUserInput}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            border: 'none',
                            height: '40px',
                            width: '200px',
                            backgroundColor: '#f4acb7',
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SingIn;
