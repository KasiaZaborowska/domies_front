// ActionsColumn.tsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from 'react-bootstrap';
import {
    useDeleteAnimalTypeMutation,
    useUpdateAnimalTypeMutation,
} from '../../../Apis/animalTypeApi';
import { animalTypeInterface } from '../../../Interfaces';
import Tooltip from '@mui/material/Tooltip';

interface ActionsColumnProps {
    row: {
        id: number;
        type: string;
    };
}

export default function ActionsColumn({ row }: ActionsColumnProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editType, isLoadingEdit] = useUpdateAnimalTypeMutation();
    const [deleteType, isLoadingDelete] = useDeleteAnimalTypeMutation();

    const [animalData, setAnimalData] = useState(row);

    const handleDelete = async (id: number) => {
        console.log('ID: ', id);
        if (id !== null && id !== undefined) {
            try {
                console.log(`Usuwam rodzaj zwierzęcia o ID: ${id}`);
                await deleteType(id);
                setShowDeleteModal(false);
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
                console.log(`Edytuje rodzaj zwierzęcia o ID: ${animalData.id}`);

                const dataToUpdate = {
                    type: animalData.type,
                };
                await editType({ data: dataToUpdate, id: animalData.id });
                console.log('animalData: ', animalData);

                setShowEditModal(false);
            } catch (error) {
                console.error('Błąd podczas edycji:', error);
            }
        } else {
            console.error('Brak ID do edycji.');
        }
    };

    // Funkcja do zmiany wartości w formularzu
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnimalData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Tooltip title="Edytuj">
                <Button
                    variant="contained"
                    color="success"
                    style={{ marginRight: 8 }}
                    onClick={() => setShowEditModal(true)}
                >
                    <i className="bi bi-pencil-fill"></i>
                </Button>
            </Tooltip>
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                className="animal_type_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj rodzaj zwierzęcia:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="type">
                            <Form.Label>Rodzaj zwierzęcia:</Form.Label>
                            <Form.Control
                                type="text"
                                name="type" // Możesz dostosować do właściwości rośliny
                                value={animalData.type || ''}
                                onChange={handleInputChange}
                                placeholder="Enter typ"
                            />
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
                className="animal_type_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdź usunięcie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy napewno chcesz usunąć ten typ zwierzęcia? Nie da się
                    tego cofnąć.
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
