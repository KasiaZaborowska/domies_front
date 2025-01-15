import React from 'react';
import { useState } from 'react';
import inputHelper from '../../Helper/inputHelper';
import { useRegisterUserMutation } from '../../Apis/accountApi';
import { apiResponse } from '../../Interfaces';
import toastNotify from '../../Helper/toastNotify';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';

function SingUp() {
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response: apiResponse = await registerUser({
            Email: userInput.Email,
            FirstName: userInput.FirstName,
            LastName: userInput.LastName,
            Password: userInput.Password,
        });
        console.log(response.data);

        if (response.data) {
            console.log('if, data:', response.data);
            toastNotify(
                'Rejestracja zakończona sukcesem! Zaloguj się aby kontynuować.',
            );
            navigate('/signIn');
        } else if (response.error) {
            console.log('error:', response.error.data.message);
            toastNotify(response.error.data.message, 'error');
        }
        setLoading(false);
    };

    return (
        <div>
            {' '}
            <div className="container text-center">
                {loading && <MainLoader />}
                <form method="post" onSubmit={handleSubmit}>
                    <h1 className="mt-5">Rejestracja</h1>
                    <div className="mt-5">
                        <div className="mt-4" style={{ minWidth: '40vw' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Podaj Email"
                                required
                                name="Email"
                                value={userInput.Email}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Podaj Imię"
                                required
                                name="FirstName"
                                value={userInput.FirstName}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Podaj Nazwisko"
                                required
                                name="LastName"
                                value={userInput.LastName}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Podaj Hasło"
                                required
                                name="Password"
                                value={userInput.Password}
                                onChange={handleUserInput}
                            />
                        </div>
                        {/* <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                            <select
                                className="form-control form-select"
                                required
                            >
                                <option value="">--Select Role--</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            style={{
                                border: 'none',
                                height: '40px',
                                width: '200px',
                                backgroundColor: '#f4acb7',
                            }}
                        >
                            Zarejestruj się
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SingUp;
