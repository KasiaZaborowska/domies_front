import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from './components/table';
import { animalTypeInterface } from '../../Interfaces';
import {
    useAddAnimalTypeMutation,
    useGetAnimalTypesQuery,
} from '../../Apis/animalTypeApi';
import { useDispatch } from 'react-redux';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import { Button, Form, Modal } from 'react-bootstrap';
import MainLoader from '../../Components/MainLoader';

function AnimalTypes() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAnimalTypesQuery(null);
    const [addType, isLoadingAdd] = useAddAnimalTypeMutation();
    const [Type, setType] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Type) {
            alert('Wszystkie pola są wymagane!');
            return;
        }

        try {
            await addType({ Type: Type }).unwrap();
            console.log('Dane, które wysyłam:', Type);
            handleClose();
            // alert('dodane!');
            // setType('');
        } catch (error) {
            console.log('Błąd', Type);
            console.error('Błąd przy dodawaniu:', error);
        }
    };
    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
    }, [isLoading, data, dispatch]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                <h1 className="text-success">Typy zwierząt</h1>
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
                                        Dodaj nowy typ zwierzęcia!
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Dodaj nowy typ zwierzęcia:
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        onSubmit={handleSubmit}
                                        controlId="animalTypeDto"
                                    >
                                        <Form.Label>Nowy typ</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={Type}
                                            placeholder="Wpisz typ"
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
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

export default AnimalTypes;
