import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import MainLoader from '../../../Components/MainLoader';
import {
    addApplicationInterface,
    animalInterface,
    applicationInterface,
    userAccountInterface,
} from '../../../Interfaces';
import inputHelper from '../../../Helper/inputHelper';
import { useAddApplicationMutation } from '../../../Apis/applicationApi';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAnimalsQuery } from '../../../Apis/animalApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Redux/store';
import { useGetOfferByIdQuery } from '../../../Apis/offerApi';
import { useAddOpinionMutation } from '../../../Apis/opinionApi';
import opinionInterface from '../../../Interfaces/opinionInterface';

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    application?: applicationInterface;
}

function AddOpinion({ show, setShow, application }: Props) {
    const [opinionToAdd] = useAddOpinionMutation();

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
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const handleAddOpinion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        const formDataToSend = {
            // dateStart: dateStart ? dateStart.toISOString() : '',
            // dateEnd: dateEnd ? dateEnd.toISOString() : '',
            // offerId: formData.offerId.toString(),
            // note: formData.note,
            // animals: formData.animals.map(
            //     (animal: animalInterface | any) => animal.id,
            // ),
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
            console.error('Błąd przy dodawaniu:', error.data.errors.Animals[0]);
            setErrorMessage(error.data.errors.Animals[0] || 'Wystąpił błąd.');
        }
    };

    const handleEditApplication = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        const formDataToSend = {
            rating: formData.rating,
            comment: formData.comment,
            applicationId: formData.applicationId.toString(),
            userEmail: formData.userEmail,
            opinionDateAdd: formData.opinionDateAdd,
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

    const handleClose = () => setShow(false);

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
                            <Form.Label>Okres opieki:</Form.Label>
                            <div className="container">
                                {/* <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer
                                        components={[
                                            'DatePicker',
                                            'DatePicker',
                                        ]}
                                    >
                                        <DatePicker
                                            label="Data startowa:"
                                            value={dateStart}
                                            onChange={(newValue) =>
                                                setDateStart(newValue)
                                            }
                                            minDate={dayjs()} // Ustawienie minimalnej daty na dzisiejszy dzień
                                        />
                                        <DatePicker
                                            label="Data końcowa:"
                                            value={
                                                application
                                                    ? dayjs(application.dateEnd)
                                                    : dateEnd
                                            }
                                            onChange={(newValue) =>
                                                setDateEnd(newValue)
                                            }
                                            minDate={dayjs()
                                                .add(1, 'day')
                                                .startOf('day')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider> */}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dla zwierzęcia:</Form.Label>
                            <Form.Group
                                as={Row}
                                className="align-items-center mb-2"
                                controlId="formAnimalTypes"
                            >
                                <div></div>
                                {errorMessage && (
                                    <p className="text-danger">
                                        {errorMessage}
                                    </p>
                                )}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dodatkowy comment:</Form.Label>
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
                        </Form.Group>
                        {application ? (
                            <></>
                        ) : (
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    label={
                                        <span>
                                            Akceptuję
                                            <a
                                                href="/termsAndConditions"
                                                style={{ color: '#4a4f7c' }}
                                            >
                                                regulamin
                                            </a>
                                            strony internetowej
                                        </span>
                                    }
                                    feedback="Musisz wyrazić zgodę przed aplikowaniem."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                        )}
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
