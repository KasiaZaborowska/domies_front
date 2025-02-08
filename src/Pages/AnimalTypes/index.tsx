import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from './components/table';
import { animalTypeInterface } from '../../Interfaces';
import {
    useAddAnimalTypeMutation,
    useDeleteAnimalTypeMutation,
    useGetAnimalTypesQuery,
    useUpdateAnimalTypeMutation,
} from '../../Apis/animalTypeApi';
import { useDispatch } from 'react-redux';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import { Button, Form, Modal } from 'react-bootstrap';
import MainLoader from '../../Components/MainLoader';
import { GridColDef } from '@mui/x-data-grid';
import ActionsColumn from './components/ActionsColumn';
import DefaultDataTable from '../Applications/components/DefaultTable';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import './components/animalTypes.css';
import inputHelper from '../../Helper/inputHelper';

function AnimalTypes() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAnimalTypesQuery(null);
    const [addType, isLoadingAdd] = useAddAnimalTypeMutation();
    const [Type, setType] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [selectedType, setSelectedType] =
        useState<animalTypeInterface | null>(null);

    const [editType] = useUpdateAnimalTypeMutation();
    const [deleteAnimalType] = useDeleteAnimalTypeMutation();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<string>('');
    const [validated, setValidated] = useState(false);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        {
            field: 'type',
            headerName: 'Typ zwierzęcia',
            width: 490,
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
    ];
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            if (data.result && Array.isArray(data.result)) {
                const dataInRows = data.result.map(
                    (item: animalTypeInterface) => ({
                        id: item.animalTypeId,
                        type: item.type,
                    }),
                );

                setRows(dataInRows); // Ustawiamy dane w stanie
            }
        }
    }, [data, navigate]);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setEditMode(false);
        //setRows([]);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async (e: React.FormEvent) => {
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!form.checkValidity()) {
            return; // Jeśli formularz jest niepoprawny, przerywamy obsługę
        }

        try {
            // edit Type
            if (editMode) {
                try {
                    setEditMode(true);

                    const dataToUpdate = {
                        type: selectedType?.type,
                    };
                    await editType({
                        data: dataToUpdate,
                        id: selectedType?.animalTypeId,
                    });

                    setEditMode(false);
                } catch (error: any) {
                    console.error('Błąd przy edycji:', error.data.errors);
                    setErrors(error.data.errors);
                }
                setValidated(true);
            } else {
                // add Type
                console.log('dodawanie............');
                await addType({ Type: Type }).unwrap();
                console.log('Dane, które wysyłam:', Type);
                handleClose();
            }
        } catch (error: any) {
            console.error('Błąd przy dodawaniu:', error.data.errors);
            setErrors(error.data.errors);
        }
        setValidated(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnimalType((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };
    function getErrorMessage(key: any) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(errors.hasOwnProperty(key) ? errors[key][0] : '');
        return errors.hasOwnProperty(key) ? errors[key][0] : '';
    }

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
    }, [isLoading, data, dispatch]);

    const handleEdit = (rows: any) => {
        setEditMode(true);
        //setRows(rows);
        setShow(true);
    };

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

                        <div className="container pt-5">
                            {/* <DataTable data={data || []} /> */}
                            <DefaultDataTable
                                key={JSON.stringify(rows)}
                                columns={columns}
                                rows={rows}
                                icon={
                                    <PetsIcon
                                        fontSize="large"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginLeft: '15px',
                                        }}
                                    />
                                }
                                onEdit={handleEdit}
                                onDelete={deleteAnimalType}
                            />
                        </div>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            dialogClassName="custom-modal"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {editMode
                                        ? 'Edytuj typ zwierzęcia'
                                        : 'Dodaj nowy typ zwierzęcia:'}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form noValidate validated={validated}>
                                    <Form.Group
                                        className="mb-3"
                                        onSubmit={handleSubmit}
                                        controlId="animalTypeDto"
                                    >
                                        <Form.Label>Typ zwierzęcia:</Form.Label>
                                        <Form.Control
                                            required
                                            name="type"
                                            type="text"
                                            defaultValue={
                                                editMode && selectedType
                                                    ? selectedType.type
                                                    : ''
                                            }
                                            placeholder="Wpisz typ"
                                            onChange={
                                                handleInputChange
                                                // (e) => setType(e.target.value)
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {getErrorMessage('Type')}
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
                    </div>
                )}
            </div>
        </>
    );
}

export default AnimalTypes;
