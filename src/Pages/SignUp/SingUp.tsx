import React from 'react';
import { useState } from 'react';
import inputHelperUtility from '../../Utils/inputHelperUtility';
import { useRegisterUserMutation } from '../../Apis/accountApi';
import { apiResponse } from '../../Interfaces';
import toastNotify from '../../Components/toastNotify';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';
import { Form } from 'react-bootstrap';

function SingUp() {
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Password: '',
    });
    // const [value, setValue] = useState<string | undefined>();
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [validated, setValidated] = useState(false);

    const inputHelperUtility2 = <T extends Record<string, any>>(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        data: T,
    ): T => ({
        ...data,
        [e.target.name]: e.target.value,
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility2(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            console.log('in');
        }
        console.log('after');
        setLoading(true);
        try {
            console.log(userInput.FirstName);
            console.log(userInput.PhoneNumber);
            console.log(userInput.Email);
            console.log(userInput.LastName);
            console.log(userInput.Password);
            // console.log(response);
            const response: apiResponse = await registerUser({
                Email: userInput.Email,
                FirstName: userInput.FirstName,
                LastName: userInput.LastName,
                PhoneNumber: userInput.PhoneNumber,
                Password: userInput.Password,
                // RoleId: 1,
            }).unwrap();
            console.log(response);
            if (response) {
                toastNotify(
                    'Rejestracja zakończona sukcesem! Potwierdź swój adres email aby móc się zalogować.',
                );
                navigate('/signIn');
            }
        } catch (error: any) {
            if (error?.data?.errors) {
                setErrorMessage(error.data.errors);
            } else {
                setErrorMessage(['Wystąpił nieznany błąd.']);
            }
        }
        setLoading(false);
        setValidated(true);
    };
    function getErrorMessage(key: any) {
        return errorMessage.hasOwnProperty(key) ? errorMessage[key][0] : '';
    }
    return (
        <div>
            <div className="container text-center">
                {loading && <MainLoader />}
                <Form
                    method="post"
                    onSubmit={handleSubmit}
                    noValidate
                    validated={validated}
                >
                    <h1 className="mt-5">Rejestracja</h1>
                    <div className="mt-5">
                        <div className="mt-4" style={{ minWidth: '40vw' }}>
                            <input
                                type="email"
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
                        </div>{' '}
                        <div className="mt-4">
                            {/* <input
                                type="text"
                                className="form-control"
                                placeholder="Podaj numer telefonu"
                                required
                                name="phoneNumber"
                                value={userInput.LastName}
                                onChange={handleUserInput}
                            /> */}
                            <div
                                className="mt-4"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    // padding: '8px',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '1.2em',
                                        marginInline: '8px',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            objectFit: 'cover',
                                        }}
                                        src="/Images/poland_icon.webp"
                                        alt="PLN"
                                    />
                                </span>
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        marginRight: '5px',
                                    }}
                                >
                                    +48
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="PhoneNumber"
                                    value={userInput.PhoneNumber}
                                    onChange={handleUserInput}
                                    required
                                    placeholder="Podaj numer telefonu"
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        flex: 1,
                                    }}
                                />
                            </div>
                            <div className="invalid-feedback">
                                {getErrorMessage('PhoneNumber')}
                            </div>
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Podaj Hasło"
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
                </Form>
            </div>
        </div>
    );
}

export default SingUp;
