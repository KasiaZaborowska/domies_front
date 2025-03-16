import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import {
    applicationInterface,
    userAccountInterface,
} from '../../../Interfaces';
import inputHelperUtility from '../../../Utils/inputHelperUtility';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Redux/store';
import { useAddOpinionMutation } from '../../../Apis/opinionApi';
import opinionInterface from '../../../Interfaces/opinionInterface';
import { Rating, Stack } from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    application?: applicationInterface;
}

function AddOpinion({ show, setShow, application }: Props) {
    const [opinionToAdd] = useAddOpinionMutation();
    const [ratingValue, setRatingValue] = useState<number | null>(2);

    const [validated, setValidated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );

    const [formData, setFormData] = useState<opinionInterface>({
        // id?: '',
        rating: 0,
        comment: '',
        applicationId: 0,
        userEmail: '',
        opinionDateAdd: '',
    });
    console.log('application');
    console.log(application);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
        setFormData(tempData);
    };

    const handleAddOpinion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        console.log(formData.rating);
        console.log(formData.comment);
        const formDataToSend = {
            rating: ratingValue,
            comment: formData.comment,
            applicationId: application?.id,
            userEmail: application?.applicant,
            // opinionDateAdd: formData.opinionDateAdd,
        };

        try {
            console.log('Dane, które wysyłam:', formDataToSend);
            console.log('FormData contents:');
            await opinionToAdd({
                data: formDataToSend,
                userId: userData.Email,
            }).unwrap();
            window.location.href = '/applications';
        } catch (error: any) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
            console.error('Błąd przy dodawaniu:', error.data.errors);
            setErrorMessage(error.data.errors || 'Wystąpił błąd.');
        }
    };

    const handleClose = () => {
        setFormData({
            // id?: '',
            rating: 0,
            comment: '',
            applicationId: 0,
            userEmail: '',
            opinionDateAdd: '',
        });

        setShow(false);
    };

    // if (isLoadingAnimals) {
    //     return <MainLoader />;
    // }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="sm"
                centered
                className="modal-20w"
                // style={{ maxWidth: '60vw' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Wystaw opienię opiekunowi:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleAddOpinion}
                    >
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Ocena:</Form.Label>
                            <div className="container">
                                <Stack spacing={1}>
                                    <Rating
                                        name="half-rating"
                                        value={ratingValue}
                                        precision={1}
                                        onChange={(event, newRatingValue) => {
                                            setRatingValue(newRatingValue); // Aktualizacja wartości
                                        }}
                                        sx={{ fontSize: '50px' }}
                                    />
                                    <p>Wybrana ocena: {ratingValue}</p>{' '}
                                    {/* Wyświetlanie wartości */}
                                </Stack>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Opinia/komentarz:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comment"
                                type="text"
                                value={formData.comment}
                                // defaultValue={formData.note}
                                placeholder="Wpisz notatkę dla opiekuna..."
                                onChange={handleUserInput}
                            />
                            <br />
                            <Alert dismissible>
                                <Alert.Heading className="d-flex align-content-center">
                                    <ReportGmailerrorredIcon
                                        fontSize="medium"
                                        className="mt-1 me-2"
                                    />
                                    Uwaga
                                </Alert.Heading>
                                <hr />
                                Do każdej aplikacji można wystawić tylko jedną
                                opinię.
                            </Alert>
                        </Form.Group>

                        <Form.Group
                            className="d-flex justify-content-end"
                            controlId="formBasicEmail"
                        >
                            <Button
                                className="m-1"
                                variant="secondary"
                                onClick={handleClose}
                            >
                                Zamknij
                            </Button>
                            <Button
                                className="m-1"
                                variant="primary"
                                type="submit"
                            >
                                Dodaj
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddOpinion;
