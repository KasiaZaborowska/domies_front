// ActionsColumn.tsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { animalInterface, animalTypeInterface } from '../../../Interfaces';
import {
    useDeleteAnimalMutation,
    useUpdateAnimalMutation,
} from '../../../Apis/animalApi';
import { useNavigate } from 'react-router-dom';
import { useGetAnimalTypesQuery } from '../../../Apis/animalTypeApi';
import inputHelperUtility from '../../../Utils/inputHelperUtility';
import AnimalModalForm from './AnimalModalForm';
import './Animals.css';
interface ActionsColumnProps {
    row: {
        id: number;
        petName: string;
        specificDescription: string;
        animalType: number;
        type: string;
    };
}

export default function ActionsColumnAnimals({ row }: ActionsColumnProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editAnimal, isLoadingEdit] = useUpdateAnimalMutation();
    const [deleteType, isLoadingDelete] = useDeleteAnimalMutation();

    const [animalData, setAnimalData] = useState(row);

    //console.log('animalData');
    //console.log(animalData);

    const [formData, setFormData] = useState<animalInterface>({
        petName: animalData.petName,
        specificDescription: animalData.specificDescription,
        //type: animalData.type,
        animalType: animalData.animalType,
    });

    const { data: animalTypes, isLoading: isLoadingAnimalTypes } =
        useGetAnimalTypesQuery(null);
    //const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        //console.log('ID: ', id);
        if (id !== null && id !== undefined) {
            try {
                //console.log(`Usuwam pupila o ID: ${id}`);
                await deleteType(id);
                setShowDeleteModal(false);
                window.location.href = '/animals';
            } catch (error) {
                console.error('Błąd podczas usuwania:', error);
            }
        } else {
            console.error('Brak ID do usunięcia.');
        }
    };

    const handleEdit = async () => {
        console.log('ID: ', animalData.id);
        console.log('animalData: ', animalData);
        if (animalData.id !== null && animalData.id !== undefined) {
            try {
                setShowEditModal(true);
                await editAnimal({ data: formData, id: animalData.id });
                console.log(
                    '______________________________________________________',
                );
                console.log('animalData + data: ', formData);
                console.log(animalData.id);

                setShowEditModal(false);
                window.location.href = '/animals';
            } catch (error) {
                console.error('Błąd podczas edycji:', error);
            }
        } else {
            console.error('Brak ID do edycji.');
        }
    };

    const renderSelected = () => {
        if (!animalTypes || !animalTypes.result || formData.animalType === 0) {
            return 'Brak wybranego typu';
        }
        const selectedAnimalType = animalTypes.result.find(
            (type: animalTypeInterface) =>
                type.animalTypeId === formData.animalType,
        );
        return selectedAnimalType ? selectedAnimalType.type : animalData.type;
    };

    const handleSelectChange = (selectedTypeId: number) => {
        console.log('Wybrano ID typu:', selectedTypeId);
        const selectedType = animalTypes?.result.find(
            (type: any) => type.animalTypeId === selectedTypeId,
        );
        if (selectedType) {
            // Aktualizuj `formData.type` na podstawie znalezionego obiektu

            setFormData((prevFormData) => ({
                ...prevFormData,
                animalType: selectedTypeId, // Przypisz nazwę typu do formData.type
            }));
            formData.animalType = selectedTypeId;
            console.log('Przypisano typ:', selectedTypeId);
            console.log('Przypisano typ:', selectedType.type);
            console.log('Przypisano formData:', formData);
        } else {
            console.log('Nie znaleziono typu o podanym ID');
        }
    };

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
        setFormData(tempData);
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                style={{ marginRight: 8 }}
                onClick={() => setShowEditModal(true)}
            >
                <i className="bi bi-pencil-fill"></i>
            </Button>
            {/* <AnimalModalForm
                initialValues={formData}
                animalTypesData={animalData}
            /> */}
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                className="animal_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj pupila:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="petName">
                            <Form.Label>Rodzaj zwierzęcia:</Form.Label>
                            <Form.Control
                                //type="text"
                                name="petName" // Możesz dostosować do właściwości rośliny
                                value={formData.petName}
                                onChange={handleUserInput}
                                placeholder="Wprowadź imię pupila"
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="specificDescription">
                            <Form.Label>Opis:</Form.Label>
                            <Form.Control
                                //type="text"
                                as="textarea"
                                rows={6}
                                name="specificDescription" // Możesz dostosować do właściwości rośliny
                                value={formData.specificDescription}
                                onChange={handleUserInput}
                                placeholder="Wprowadź opis"
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="type">
                            <Form.Label>Rodzaj zwierzęcia:</Form.Label>
                            <DropdownButton
                                title={renderSelected() || animalData.type}
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
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowEditModal(false)}
                    >
                        Zamknij
                    </Button>
                    <Button variant="danger" onClick={() => handleEdit()}>
                        {isLoadingEdit ? 'Edytuj' : 'Edytowanie...'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button
                variant="contained"
                color="error"
                className="btn btn-danger mx-2"
                onClick={() => setShowDeleteModal(true)}
            >
                <i className="bi bi-trash-fill"></i>
            </Button>
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                className="animal_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdź usunięcie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: 'center' }}>
                        Czy napewno chcesz usunąć ten typ zwierzęcia?
                        <br />
                        <br />
                        Nie da się tego cofnąć.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Zamknij
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(row.id)}
                    >
                        {isLoadingDelete ? 'Usuń' : 'Usuwanie...'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
