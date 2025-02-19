import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
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

interface Props {
    offerId: number;
}

function UpdateApplication({ offerId }: Props) {
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

    const [validated, setValidated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );

    const [formData, setFormData] = useState<addApplicationInterface>({
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
    });
    const {
        data: animalTypesAccepted,
        isLoading: isLoadingAnimalTypesAccepted,
    } = useGetOfferByIdQuery({
        id: offerId,
    });
    console.log(animalTypesAccepted);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
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
            dateStart: dateStart ? dateStart.toISOString() : '',
            dateEnd: dateEnd ? dateEnd.toISOString() : '',
            offerId: formData.offerId.toString(),
            note: formData.note,
            animals: formData.animals.map(
                (animal: animalInterface | any) => animal.id,
            ),
        };

        try {
            console.log('Dane, które wysyłam:', formDataToSend);
            console.log('FormData contents:');
            await applicationToAdd({
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        console.log('aaaaaaaaaaaaaaaaa');
        if (!isLoadingAnimalTypesAccepted) {
            console.log(animalTypesAccepted.result.offerAnimalTypes);
            const tableAnimalTypes: string[] =
                animalTypesAccepted.result.offerAnimalTypes.split(', ');
            console.log('tableAnimalTypes');
            console.log(tableAnimalTypes);
            // setTableAnimalsFromOffer(tableAnimalTypes);

            const filtredAnimals = animals.result.filter((animal: any) =>
                tableAnimalTypes?.includes(animal.type),
            );
            console.log('filtredAnimals');
            console.log(filtredAnimals);
            setFilteredTableAnimalsFromOffer(filtredAnimals);
        }
    }, [isLoadingAnimalTypesAccepted, isLoadingAnimals]);

    console.log('filtredtableAnimalsFromOffer');
    console.log(filtredtableAnimalsFromOffer);
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
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleAddApplication}
                    >
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
                                        {filtredtableAnimalsFromOffer.length >
                                        0 ? (
                                            filtredtableAnimalsFromOffer.map(
                                                (animal: any) => (
                                                    <Form.Check
                                                        className="m-2"
                                                        key={animal.id}
                                                        type="checkbox"
                                                        label={animal.petName}
                                                        value={animal.id}
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
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                Brak dostępnych typów zwierząt
                                                do tej oferty!
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
                        <Form.Group className="mb-3" controlId="animalDto">
                            <Form.Label>Dodatkowy opis:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="note"
                                type="text"
                                value={formData.note}
                                placeholder="Wpisz notatkę dla opiekuna..."
                                onChange={handleUserInput}
                            />
                        </Form.Group>
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

export default UpdateApplication;
