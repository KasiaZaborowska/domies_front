import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import MainLoader from '../../../Components/MainLoader';
import {
    addApplicationInterface,
    animalInterface,
    applicationInterface,
    userAccountInterface,
} from '../../../Interfaces';
import inputHelperUtility from '../../../Utils/inputHelperUtility';
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

interface Props {
    offerId: number;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    application?: applicationInterface;
}

function Application({ offerId, show, setShow, application }: Props) {
    const { data: animals, isLoading: isLoadingAnimals } =
        useGetAnimalsQuery(null);
    const [dateStart, setDateStart] = React.useState<Dayjs | null>(dayjs());
    const [dateEnd, setDateEnd] = React.useState<Dayjs | null>(
        dayjs().add(1, 'day').startOf('day'),
    );

    console.log(dateStart);
    console.log(dateEnd);
    const [applicationToAdd] = useAddApplicationMutation();

    const [validated, setValidated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );

    const defaultFormData = {
        dateStart: '',
        dateEnd: '',
        offerId: offerId,
        toUser: '',
        applicationDateAdd: '',
        note: '',
        animals: [
            // {
            //     petName: '',
            //     specificDescription: '',
            //     animalType: 0,
            // },
        ],
    };

    const [formData, setFormData] = useState<addApplicationInterface>(
        // application ? application : defaultFormData, // jak applic null to deata
        {
            dateStart: '',
            dateEnd: '',
            offerId: offerId,
            toUser: '',
            applicationDateAdd: '',
            note: '',
            animals: [
                // {
                //     petName: '',
                //     specificDescription: '',
                //     animalType: 0,
                // },
            ],
        },
    );
    const {
        data: animalTypesAccepted,
        isLoading: isLoadingAnimalTypesAccepted,
    } = useGetOfferByIdQuery({
        id: offerId,
    });
    console.log('application');
    console.log(application);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
        setFormData(tempData);
    };

    const renderSelected = () => {
        const animalNames = formData.animals.map(
            (animal: animalInterface) => animal.petName,
        );
        return animalNames.join(', ') || 'Wybierz';
    };

    const handleCheckboxChange = (animalId: number) => {
        if (!isLoadingAnimals) {
            const selectedAnimal = animals.result.find(
                (animal: animalInterface) => animal.id === animalId,
            );

            if (selectedAnimal) {
                setFormData((prev) => {
                    const isSelected = prev.animals.includes(selectedAnimal);
                    const updatedAnimals = isSelected
                        ? prev.animals.filter(
                              (animal) => animal.id !== selectedAnimal.id,
                          )
                        : [...prev.animals, selectedAnimal];

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
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        const formDataToSend = {
            dateStart: dateStart ? dateStart.format('YYYY-MM-DD') : '',
            dateEnd: dateEnd ? dateEnd.format('YYYY-MM-DD') : '',
            offerId: formData.offerId.toString(),
            note: formData.note,
            animals: formData.animals.map(
                (animal: animalInterface | any) => animal.id,
            ),
        };
        console.log(formDataToSend);

        try {
            console.log('Dane, które wysyłam:', formDataToSend);
            await applicationToAdd({
                data: formDataToSend,
                userId: userData.Email,
            }).unwrap();
            // window.location.href = '/applications';
        } catch (error: any) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
            console.error('Błąd przy dodawaniu:', error.data.errors.Animals[0]);
            setErrorMessage(error.data.errors.Animals[0] || 'Wystąpił błąd.');
        }
    };

    // const handleEditApplication = async (
    //     e: React.FormEvent<HTMLFormElement>,
    // ) => {
    //     e.preventDefault();
    //     const form = e.currentTarget;
    //     if (form.checkValidity() === false) {
    //         e.stopPropagation();
    //     }
    //     setValidated(true);

    //     const formDataToSend = {
    //         dateStart: dateStart ? dateStart.toISOString() : '',
    //         dateEnd: dateEnd ? dateEnd.toISOString() : '',
    //         offerId: formData.offerId.toString(),
    //         note: formData.note,
    //         animals: formData.animals.map(
    //             (animal: animalInterface | any) => animal.id,
    //         ),
    //     };

    //     try {
    //         console.log('Dane, które wysyłam:', formDataToSend);
    //         console.log('FormData contents:');
    //         await applicationToAdd({
    //             data: formDataToSend,
    //             userId: userData.Email,
    //         }).unwrap();
    //         window.location.href = '/applications';
    //     } catch (error: any) {
    //         console.log('Błąd');
    //         console.error('Błąd przy dodawaniu:', error);
    //         console.error('Błąd przy dodawaniu:', error.data.errors.Animals[0]);
    //         setErrorMessage(error.data.errors.Animals[0] || 'Wystąpił błąd.');
    //     }
    // };

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [tableAnimalsFromOffer, setTableAnimalsFromOffer] =
    //     useState<string[]>();
    // console.log('tableAnimalsFromOffer');
    // console.log(tableAnimalsFromOffer);

    const [filtredtableAnimalsFromOffer, setFilteredTableAnimalsFromOffer] =
        useState<string[]>([]);

    useEffect(() => {
        if (dateStart && (!dateEnd || dateEnd.isBefore(dateStart))) {
            setDateEnd(dateStart.add(1, 'day'));
        }
    }, [dateStart, dateEnd]);

    useEffect(() => {
        if (isLoadingAnimalTypesAccepted || isLoadingAnimals) return;
        const tableAnimalTypes: string[] =
            animalTypesAccepted.result.offerAnimalTypes.split(', ');

        const filtredAnimals = animals.result.filter((animal: any) =>
            tableAnimalTypes?.includes(animal.type),
        );
        setFilteredTableAnimalsFromOffer(filtredAnimals);
    }, [isLoadingAnimalTypesAccepted, isLoadingAnimals]);

    if (isLoadingAnimals) {
        return <MainLoader />;
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size={'lg'}
                style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '25vw',
                    marginTop: '10vw',
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {application
                            ? 'Edytuj aplikację:'
                            : 'Aplikuj na ofertę:'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={
                            // ? handleEditApplication
                            handleAddApplication
                        }
                    >
                        {application ? (
                            <></>
                        ) : (
                            <>
                                <Form.Group
                                    className="mb-3"
                                    controlId="animalDto"
                                >
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
                                <Form.Group
                                    className="mb-3"
                                    controlId="animalDto"
                                >
                                    <Form.Label>Dla zwierzęcia:</Form.Label>
                                    <Form.Group
                                        as={Row}
                                        className="align-items-center mb-2"
                                        controlId="formAnimalTypes"
                                    >
                                        <div>
                                            {' '}
                                            <DropdownButton
                                                title={
                                                    renderSelected() ||
                                                    'Wybierz..'
                                                }
                                            >
                                                {filtredtableAnimalsFromOffer.length >
                                                0 ? (
                                                    filtredtableAnimalsFromOffer.map(
                                                        (animal: any) => (
                                                            <Form.Check
                                                                className="m-2"
                                                                key={animal.id}
                                                                type="checkbox"
                                                                label={
                                                                    animal.petName
                                                                }
                                                                value={
                                                                    animal.id
                                                                }
                                                                checked={formData.animals.includes(
                                                                    animal,
                                                                )}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        animal.id,
                                                                    )
                                                                }
                                                            />
                                                        ),
                                                    )
                                                ) : (
                                                    <Form.Text
                                                        style={{
                                                            padding: '15px',
                                                            fontWeight: 'bold',
                                                            backgroundColor:
                                                                'lightgrey',
                                                            borderRadius:
                                                                '10px',
                                                        }}
                                                    >
                                                        Brak dostępnych typów
                                                        zwierząt do tej oferty!
                                                    </Form.Text>
                                                )}
                                            </DropdownButton>
                                        </div>
                                        {errorMessage && (
                                            <p className="text-danger">
                                                {errorMessage}
                                            </p>
                                        )}
                                    </Form.Group>
                                </Form.Group>
                            </>
                        )}

                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dodatkowy opis:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="note"
                                type="text"
                                defaultValue={
                                    application
                                        ? application.note
                                        : formData.note
                                }
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
                                            Akceptuję{' '}
                                            <a
                                                href="/termsAndConditions"
                                                style={{ color: '#4a4f7c' }}
                                            >
                                                regulamin
                                            </a>{' '}
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

export default Application;
