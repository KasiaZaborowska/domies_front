import React, { useState } from 'react';
import inputHelperUtility from '../../Utils/inputHelperUtility';
import { useLoginUserMutation } from '../../Apis/accountApi';
import { userAccountInterface } from '../../Interfaces';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../Store/Redux/userAccountSlice';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';
import toastNotify from '../../Components/toastNotify';

function SingIn() {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [validated, setValidated] = useState(false);
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        Email: '',
        Password: '',
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            console.log('is  false ! ');
            // return;
        }
        setLoading(true);
        try {
            const response: any = await loginUser({
                Email: userInput.Email,
                Password: userInput.Password,
            }).unwrap();

            console.log(response);
            console.log(response.token);

            if (response) {
                console.log('if, data:', response);
                const token = response.token;
                console.log(token);
                const {
                    Email,
                    FirstName,
                    LastName,
                    Role,
                }: userAccountInterface = jwt_decode(token);
                console.log(' przed token ustawiam');
                localStorage.setItem('firstName', FirstName);
                localStorage.setItem('lastName', LastName);
                localStorage.setItem('role', Role);
                localStorage.setItem('token', token);
                console.log('token ustawiam');
                dispatch(setLoggedInUser({ Email, FirstName, LastName, Role }));
                console.log(
                    setLoggedInUser({ Email, FirstName, LastName, Role }),
                );

                navigate('/');
                toastNotify('Logowanie zakończone sukcesem.');
            }
        } catch (error: any) {
            console.error('Błąd przy dodawaniu:', error.data?.errors);
            if (error?.data?.errors) {
                setErrorMessage(error.data.errors);
            } else {
                console.log('error:', error.data.message);
                toastNotify(error.data.message, 'error');
                setLoading(false);
                setValidated(false);
                return;
            }
        }

        setLoading(false);
        setValidated(true);
    };
    function getErrorMessage(key: any) {
        return errorMessage.hasOwnProperty(key) ? errorMessage[key][0] : '';
    }
    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <Form
                method="post"
                onSubmit={handleSubmit}
                noValidate
                validated={validated}
            >
                <h1 className="mt-5">Logowanie</h1>
                <div className="mt-5" style={{ minWidth: '40vw' }}>
                    <div className="mt-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Podaj adres e-mail"
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
                            type="password"
                            className="form-control"
                            placeholder="Podaj hasło"
                            required
                            minLength={8}
                            name="Password"
                            value={userInput.Password}
                            onChange={handleUserInput}
                        />
                        <div className="invalid-feedback">
                            {getErrorMessage('Password')}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
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
                        Zaloguj się
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default SingIn;
