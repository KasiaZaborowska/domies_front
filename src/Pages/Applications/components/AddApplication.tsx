import React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import MainLoader from '../../../Components/MainLoader';
import { applicationInterface } from '../../../Interfaces';
import inputHelper from '../../../Helper/inputHelper';
import { useAddApplicationMutation } from '../../../Apis/applicationApi';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAnimalsQuery } from '../../../Apis/animalApi';

function AddApplication() {
    const { data: animals, isLoading } = useGetAnimalsQuery(null);
    console.log('dataaaa');
    console.log(animals);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [applicationToAdd] = useAddApplicationMutation();

    const [formData, setFormData] = useState<applicationInterface>({
        dateStart: '',
        dateEnd: '',
        offerId: 0,
        toUser: '',
        applicationDateAdd: '',
        animals: [
            {
                petName: '',
                specificDescription: '',
                animalType: 0,
            },
        ],
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) {
            alert('Wszystkie pola są wymagane!');
            return;
        }

        try {
            console.log('Dane, które wysyłam:', formData);
            await applicationToAdd({
                data: formData,
                //userId: userData.Email,
            }).unwrap();
            window.location.href = '/animals';
        } catch (error) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    //console.log('rows:', rows);
    //console.log(animalTypes.result);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nowe zwierze:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Okres opieki:</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={['DatePicker', 'DatePicker']}
                                >
                                    <DatePicker
                                        label="Data startowa:"
                                        value={value}
                                        onChange={(newValue) =>
                                            setValue(newValue)
                                        }
                                    />
                                    <DatePicker
                                        label="Data końcowa:"
                                        value={value}
                                        onChange={(newValue) =>
                                            setValue(newValue)
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Imię zwierzęcia:</Form.Label>
                            <Form.Control
                                name="dateStart"
                                type="text"
                                value={formData.dateStart}
                                placeholder="Wpisz typ"
                                onChange={handleUserInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Opis zwierzęcia:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="specificDescription"
                                type="text"
                                value={formData.dateEnd}
                                placeholder="Wpisz typ"
                                onChange={handleUserInput}
                            />
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
                                //onClick={handleSubmit}
                            >
                                Dodaj
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* )}
            </div> */}
        </>
    );
}

export default AddApplication;
