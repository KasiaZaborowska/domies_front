import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteButtonWithModalProps {
    id: number;
    deleteFunction: (
        id: number,
    ) => Promise<
        { data: any } | { error: FetchBaseQueryError | SerializedError }
    >;
}

function DeleteButtonWithModal({
    id,
    deleteFunction,
}: DeleteButtonWithModalProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleConfirmDelete = async () => {
        console.log('ID: ', id);
        if (id) {
            try {
                await deleteFunction(id);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Błąd podczas usuwania:', error);
            }
        } else {
            console.error('Brak ID do usunięcia.');
        }
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <>
                <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    centered
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Czy napewno chcesz usunąć ten element? Nie da się tego
                        cofnąć.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Zamknij
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            {'Usuń'}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    style={{
                        marginRight: 8,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                    variant="contained"
                    color="error"
                    className="btn btn-danger mx-2"
                    //onClick={() => onEdit(params.row)}
                    onClick={() => setShowDeleteModal(true)}
                >
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </>
        </>
    );
}

export default DeleteButtonWithModal;
