import React, { useEffect } from 'react';
import { useState } from 'react';
// import ApplicationDataTable from './components/ApplicationTable';
// import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import MainLoader from '../../Components/MainLoader';
import { applicationInterface } from '../../Interfaces';
import inputHelper from '../../Helper/inputHelper';
import {
    useAddApplicationMutation,
    useDeleteApplicationMutation,
    useGetApplicationsQuery,
} from '../../Apis/applicationApi';
import DefaultDataTable from './components/DefaultTable';
import { useNavigate } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { useGetAnimalsQuery } from '../../Apis/animalApi';
import EmailIcon from '@mui/icons-material/Email';
import './Applications.css';
import DeleteButtonWithModal from './components/HandleDelete';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Applications() {
    const { data, isLoading } = useGetApplicationsQuery(null);
    const { data: animals } = useGetAnimalsQuery(null);
    console.log('dataaaa');
    console.log(data);
    console.log(animals);
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

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

    const [deleteApplication] = useDeleteApplicationMutation();

    // const handleDelete = async (id: number) => {
    //     console.log('ID: ', id);
    //     if (id !== null && id !== undefined) {
    //         try {
    //             // console.log(`Usuwam pupila o ID: ${id}`);
    //             await deleteApplication(id);
    //             //setShowDeleteModal(false);
    //             window.location.href = '/applications';
    //         } catch (error) {
    //             console.error('Błąd podczas usuwania:', error);
    //         }
    //     } else {
    //         console.error('Brak ID do usunięcia.');
    //     }
    // };
    // const dataToDelete: applicationInterface = data.result;

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!formData) {
    //         alert('Wszystkie pola są wymagane!');
    //         return;
    //     }

    //     try {
    //         console.log('Dane, które wysyłam:', formData);
    //         await offferToAdd({
    //             data: formData,
    //             //userId: userData.Email,
    //         }).unwrap();
    //         window.location.href = '/animals';
    //     } catch (error) {
    //         console.log('Błąd');
    //         console.error('Błąd przy dodawaniu:', error);
    //     }
    // };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns: GridColDef[] = [
        {
            field: 'dateStart',
            headerName: 'Data początkowa',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'dateEnd',
            headerName: 'Data końcowa',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'offerId',
            headerName: 'Oferta',
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'toUser',
            headerName: 'Użytkownik',
            minWidth: 200,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'petName',
            headerName: 'Imię/Imiona',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'specificDescription',
            headerName: 'Opis pupila',
            minWidth: 300,
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => (
                <div
                    style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        padding: '5px',
                    }}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'applicationDateAdd',
            headerName: 'Data aplikowania',
            minWidth: 150,
        },
    ];
    const [rows, setRows] = useState([]);
    if (!isLoading) {
        console.log(data.result);
    }

    useEffect(() => {
        if (!isLoading) {
            if (data.result && Array.isArray(data.result)) {
                console.log('Data:', data.result);
                const dataInRows = data.result.map(
                    (item: applicationInterface) => ({
                        id: item.id,
                        dateStart: new Date(item.dateStart).toLocaleDateString(
                            'pl-PL',
                        ),
                        dateEnd: new Date(item.dateEnd).toLocaleDateString(
                            'pl-PL',
                        ),
                        offerId: item.offerId,
                        toUser: item.toUser,
                        applicationDateAdd: new Date(
                            item.applicationDateAdd,
                        ).toLocaleDateString('pl-PL'),
                        petName: item.animals
                            .map((animal) => animal.petName)
                            .join(', '),
                        specificDescription: item.animals
                            .map((animal) => animal.specificDescription)
                            .join(', '),
                    }),
                );

                setRows(dataInRows); // Ustawiamy dane w stanie
                console.log('dataInRows');
                console.log(dataInRows);
                console.log(data.result[1].animals);
            }
        }
    }, [data, navigate]);

    // const handleDelete = async (row: any) => {
    //     if (row && row.id) {
    //         DeleteButtonWithModal({
    //             id: row.id,
    //             deleteFunction: async (id: number) =>
    //                 await deleteApplication({ id }),
    //         });
    //     } else {
    //         console.error('Brak ID w wierszu do usunięcia:', row);
    //     }
    //     // DeleteButtonWithModal(data.result.id, deleteApplication);
    // };

    if (isLoading) {
        return <MainLoader />;
    }
    //console.log('rows:', rows);
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
                                <h1 className="text-success">
                                    Twoje aplikacje
                                </h1>
                                {/* <div className="d-flex justify-content-end pt-4">
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
                                </div> */}
                            </div>
                        </div>

                        <div className="containerApplications pt-5">
                            <DefaultDataTable
                                key={JSON.stringify(rows)}
                                columns={columns}
                                rows={rows}
                                icon={
                                    <EmailIcon
                                        fontSize="large"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginLeft: '15px',
                                        }}
                                    />
                                }
                                //onEdit={handleEdit}
                                onDelete={deleteApplication}
                            />
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Dodaj nowe zwierze:</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="animalDto"
                                    >
                                        <Form.Label>Okres opieki:</Form.Label>
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
                                                    value={value}
                                                    onChange={(newValue) =>
                                                        setValue(newValue)
                                                    }
                                                />
                                                <DatePicker
                                                    label="Data końcowa:"
                                                    value={value}
                                                    onChange={(newValue) =>
                                                        setValue(newValue)
                                                    }
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="animalDto"
                                    >
                                        <Form.Label>
                                            Imię zwierzęcia:
                                        </Form.Label>
                                        <Form.Control
                                            name="dateStart"
                                            type="text"
                                            value={formData.dateStart}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
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
                    </div>
                )}
            </div>
        </>
    );
}

export default Applications;
