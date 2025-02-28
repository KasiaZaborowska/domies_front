import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from './components/table';
// import { useDispatch } from 'react-redux';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import MainLoader from '../../Components/MainLoader';
import { useAddAnimalMutation, useGetAnimalsQuery } from '../../Apis/animalApi';
import {
    animalInterface,
    animalTypeInterface,
    userAccountInterface,
} from '../../Interfaces';
import inputHelper from '../../Helper/inputHelper';
import { useGetAnimalTypesQuery } from '../../Apis/animalTypeApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Redux/store';

function Animals() {
    //const dispatch = useDispatch();
    const { data, isLoading } = useGetAnimalsQuery(null);
    const { data: animalTypes, isLoading: isLoadingAnimalTypes } =
        useGetAnimalTypesQuery(null);

    //console.log('dataaaaaaa');
    //console.log(data);

    const [offferToAdd] = useAddAnimalMutation();

    const [formData, setFormData] = useState<animalInterface>({
        petName: '',
        specificDescription: '',
        animalType: 0,
    });
    //console.log(formData);
    const [errors, setErrors] = useState<string>('');
    const [validated, setValidated] = useState(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const renderSelected = () => {
        if (!isLoading) {
            if (
                !animalTypes ||
                !animalTypes.result ||
                formData.animalType === 0
            ) {
                return 'Brak wybranego typu';
            }
            const selectedAnimalType = animalTypes.result.find(
                (type: animalTypeInterface) =>
                    type.animalTypeId === formData.animalType,
            );
            return selectedAnimalType
                ? selectedAnimalType.type
                : 'nie znaleziono typu';
        }
    };
    const handleSelectChange = (selectedTypeId: number) => {
        console.log('Wybrano ID typu:', selectedTypeId);
        const selectedType = animalTypes?.result.find(
            (type: any) => type.animalTypeId === selectedTypeId,
        );
        console.log(' abc selectedTypeId ', selectedTypeId);
        if (selectedType) {
            // Aktualizuj `formData.type` na podstawie znalezionego obiektu
            setFormData((prevFormData) => ({
                ...prevFormData,
                animalType: selectedTypeId, // Przypisz nazwę typu do formData.type
            }));
            console.log('Przypisano typ:', selectedType.type);
            console.log('Przypisano formData:', formData);
        } else {
            console.log('Nie znaleziono typu o podanym ID');
        }
    };
    //console.log('Przypisano formData2:', formData);
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        // if (!formData) {
        //     alert('Wszystkie pola są wymagane!');
        //     return;
        // }
        if (!form.checkValidity()) {
            return; // Jeśli formularz jest niepoprawny, przerywamy obsługę
        }
        try {
            console.log('Dane, które wysyłam:', formData);
            await offferToAdd({
                data: formData,
                userId: userData.Email,
            }).unwrap();
            window.location.href = '/animals';
        } catch (error: any) {
            //console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error.data.errors);
            setErrors(error.data.errors);
        }
        setValidated(true);
    };

    function getErrorMessage(key: any) {
        console.log(typeof (errors.hasOwnProperty(key) ? errors[key][0] : ''));
        return errors.hasOwnProperty(key) ? errors[key][0] : '';
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setErrors('');
        setFormData({
            petName: '',
            specificDescription: '',
            animalType: 0,
        });
    };
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <MainLoader />;
    }

    if (isLoadingAnimalTypes) {
        return <MainLoader />;
    }
    //console.log(animalTypes.result);
    return (
        <>
            <div className="h-dvh">
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-full pt-5">
                        <MainLoader />
                    </div>
                ) : (
                    <div>
                        <div className="p-3">
                            <div className="d-flex align-items-center justify-content-between mx-5 px-4">
                                <h1 className="text-success">Pupile</h1>
                                <div className="d-flex justify-content-end pt-4">
                                    <Button
                                        onClick={handleShow}
                                        style={{
                                            backgroundColor: 'pink',
                                            borderColor: 'pink',
                                            borderRadius: '50px',
                                            padding: '10px',
                                            color: 'black',
                                        }}
                                    >
                                        Dodaj nowe zwierzę!
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Dodaj nowe zwierze:</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form
                                    noValidate
                                    validated={validated}
                                    //onSubmit={handleSubmit}
                                >
                                    <Form.Group
                                        className="mb-3"
                                        //onSubmit={handleSubmit}
                                        controlId="animalDto"
                                    >
                                        <Form.Label>
                                            Imię zwierzęcia:
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            name="petName"
                                            type="text"
                                            value={formData.petName}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {getErrorMessage('PetName')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        onSubmit={handleSubmit}
                                        controlId="animalDto"
                                    >
                                        <Form.Label>
                                            Opis zwierzęcia:
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="specificDescription"
                                            type="text"
                                            value={formData.specificDescription}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {getErrorMessage(
                                                'SpecificDescription',
                                            )}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        onSubmit={handleSubmit}
                                        controlId="animalDto"
                                    >
                                        <Form.Label>Typ zwierzęcia:</Form.Label>
                                        {/* <Form.Control
                                            name="type"
                                            type="text"
                                            value={formData.type}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                        /> */}
                                        <DropdownButton
                                            title={
                                                renderSelected() ||
                                                'wybierz typy  zwierząt'
                                            }
                                        >
                                            {animalTypes.result.map(
                                                (type: animalTypeInterface) => (
                                                    <Dropdown.Item
                                                        key={type.animalTypeId}
                                                        onClick={() =>
                                                            handleSelectChange(
                                                                type.animalTypeId,
                                                            )
                                                        }
                                                    >
                                                        {type.type}
                                                    </Dropdown.Item>
                                                ),
                                            )}
                                        </DropdownButton>
                                        <Form.Control.Feedback type="invalid">
                                            {getErrorMessage('AnimalType')}
                                        </Form.Control.Feedback>
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
                                            onClick={handleSubmit}
                                        >
                                            Dodaj
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <div className="container pt-5">
                            <DataTable data={data || []} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Animals;
