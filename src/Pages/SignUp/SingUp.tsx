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
    const [errors, setErrors] = useState<string>('');
    const [validated, setValidated] = useState(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!form.checkValidity()) {
            return; // Jeśli formularz jest niepoprawny, przerywamy obsługę
        }
        setLoading(true);
        try {
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
                    'Rejestracja zakończona sukcesem! Potwierdź swój adres email aby móc się zalogować.',
                );
                navigate('/signIn');
            }
            // else if (response.error) {
            //     console.log('error:', response.error.data.message);
            //     toastNotify(response.error.data.message, 'error');
            //     setErrors(response.error.data.message);
            // }
        } catch (error: any) {
            //console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error.response.errors);
            setErrors(error.response.errors);
        }
        setLoading(false);
        setValidated(true);
    };
    function getErrorMessage(key: any) {
        console.log(errors.hasOwnProperty(key) ? errors[key][0] : '');
        console.log(errors);
        return errors.hasOwnProperty(key) ? errors[key][0] : '';
    }
    return (
        <div>
            {' '}
            <div className="container text-center">
                {loading && <MainLoader />}
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    noValidate={validated}
                >
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
                            <div className="invalid-feedback">
                                {getErrorMessage('Email')}
                            </div>
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
                            <div className="invalid-feedback">
                                {getErrorMessage('FirstName')}
                            </div>
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
                            <div className="invalid-feedback">
                                {getErrorMessage('LastName')}
                            </div>
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
                            <div className="invalid-feedback">
                                {getErrorMessage('Password')}
                            </div>
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
