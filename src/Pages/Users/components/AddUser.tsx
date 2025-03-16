import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import MainLoader from '../../../Components/MainLoader';
import { animalInterface, applicationInterface } from '../../../Interfaces';
import inputHelperUtility from '../../../Utils/inputHelperUtility';
import { useAddApplicationMutation } from '../../../Apis/applicationApi';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAnimalsQuery } from '../../../Apis/animalApi';
import { useParams } from 'react-router-dom';

interface Props {
    offerId: number;
}

function AddUser({ offerId }: Props) {
    const { data: animals, isLoading: isLoadingAnimals } =
        useGetAnimalsQuery(null);
    console.log('dataaaa');
    console.log(animals);
    const [dateStart, setDateStart] = React.useState<Dayjs | null>(dayjs());
    const [dateEnd, setDateEnd] = React.useState<Dayjs | null>(
        dayjs().add(1, 'day').startOf('day'),
    );
    const [applicationToAdd] = useAddApplicationMutation();
    console.log('offerIdaaaaaaaaaaaaaaa ', offerId);

    const [formData, setFormData] = useState<applicationInterface>({
        dateStart: '',
        dateEnd: '',
        offerId: offerId,
        applicant: '',
        applicationDateAdd: '',
        note: '',
        animals: [
            // {
            //     petName: '',
            //     specificDescription: '',
            //     animalType: 0,
            // },
        ],
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
        setFormData(tempData);
    };

    // const renderAnimals = () =>
    //     animals.map(
    //         (id: number) => animals.find((a: any) => a.id === id)?.petName,
    //     );

    const renderSelected = () => {
        return formData.animals.join(', ') || 'Wybierz';
    };

    const handleCheckboxChange = (animalId: number) => {
        if (!isLoadingAnimals) {
            const selectedPetName = animals.result.find(
                (petName: animalInterface) => petName.id === animalId,
            )?.petName;

            if (selectedPetName) {
                setFormData((prev) => {
                    const isSelected = prev.animals.includes(selectedPetName);
                    const updatedAnimals = isSelected
                        ? prev.animals.filter(
                              (petName) => petName !== selectedPetName,
                          )
                        : [...prev.animals, selectedPetName];

                    return { ...prev, animals: updatedAnimals };
                });
            } else {
                return 'wybierz...';
            }
        }
    };

    const handleAddApplication = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        if (!formData) {
            alert('Wszystkie pola są wymagane!');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('dateStart', formData.dateStart);
        formDataToSend.append('dateEnd', formData.dateEnd);
        formDataToSend.append('offerId', formData.offerId.toString());
        formData.animals.forEach((animal: animalInterface | any) => {
            formDataToSend.append('animals[]', animal);
        });

        try {
            console.log('Dane, które wysyłam:', formData);
            console.log(formDataToSend);
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
    if (isLoadingAnimals) {
        return <MainLoader />;
    }

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
                    <Form onSubmit={handleAddApplication}>
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
                            <Form.Group
                                as={Row}
                                className="align-items-center mb-2"
                                controlId="formAnimalTypes"
                            >
                                <div>
                                    {' '}
                                    <DropdownButton
                                        title={renderSelected() || 'Wybierz..'}
                                    >
                                        {animals.result.map((animal: any) => (
                                            <Form.Check
                                                className="m-2"
                                                key={animal.id}
                                                type="checkbox"
                                                label={animal.petName}
                                                value={animal.id}
                                                checked={formData.animals.includes(
                                                    animal.petName,
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        animal.id,
                                                    )
                                                }
                                            />
                                        ))}
                                    </DropdownButton>
                                </div>
                            </Form.Group>
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
                            <Button variant="primary" type="submit">
                                Dodaj
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddUser;
