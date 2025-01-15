import React, { useEffect } from 'react';
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
    const { data: animals } = useGetAnimalsQuery(null);
    console.log('dataaaa');
    console.log(animals);
    const [dateStart, setDateStart] = React.useState<Dayjs | null>(dayjs());
    const [dateEnd, setDateEnd] = React.useState<Dayjs | null>(
        dayjs().add(1, 'day').startOf('day'),
    );
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

    const renderAnimals = () =>
        animals.map(
            (id: number) => animals.find((a: any) => a.id === id)?.petName,
        );
    console.log('renderAnimals');
    console.log(renderAnimals.length);

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

    useEffect(() => {
        if (dateStart && (!dateEnd || dateEnd.isBefore(dateStart))) {
            setDateEnd(dateStart.add(1, 'day'));
        }
    }, [dateStart, dateEnd]);

    //console.log('rows:', rows);
    //console.log(animalTypes.result);
    return (
        <>
            {/* CREATE BUTTON  */}
            <button
                className="btn form-control"
                style={{
                    height: '40px',
                    padding: '1px',
                    fontSize: '20px',
                    backgroundColor: '#5e503f',
                    color: 'white',
                }}
                onClick={() => setShow((prev) => !prev)}
            >
                Zarezerwuj
            </button>

            <Modal show={show} onHide={handleClose} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title>Aplikuj na ofertę:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Okres opieki:</Form.Label>
                            <div className="container">
                                <LocalizationProvider
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
                                            value={dateEnd}
                                            onChange={(newValue) =>
                                                setDateEnd(newValue)
                                            }
                                            minDate={dayjs()
                                                .add(1, 'day')
                                                .startOf('day')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dla zwierzęcia:</Form.Label>
                            <Form.Control
                                name="dateStart"
                                type="text"
                                value={formData.dateStart}
                                placeholder="Wpisz typ"
                                onChange={handleUserInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dodatkowy opis:</Form.Label>
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
        </>
    );
}

export default AddApplication;
