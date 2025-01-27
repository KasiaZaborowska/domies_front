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
import DefaultDataTable from '../Applications/components/DefaultTable';
import { useNavigate } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import './Users.css';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetUsersQuery } from '../../Apis/userApi';
import userInterface from '../../Interfaces/userInterface';

function Users() {
    const { data, isLoading } = useGetUsersQuery(null);
    // const { data: animals } = useGetAnimalsQuery(null);
    console.log('dataaaa');
    console.log(data);
    // console.log(animals);
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const [applicationToAdd] = useAddApplicationMutation();

    const [formData, setFormData] = useState<userInterface>({
        email: '',
        firstName: '',
        lastName: '',
        roleId: 0,
        roleName: '',
        dateAdd: '',
    });

    const [deleteApplication] = useDeleteApplicationMutation();

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
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'firstName',
            headerName: 'Imię',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'lastName',
            headerName: 'Nazwisko',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'roleName',
            headerName: 'Rola',
            minWidth: 200,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'dateAdd',
            headerName: 'Data dodania',
            minWidth: 250,
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
                const dataInRows = data.result.map((item: userInterface) => ({
                    id: item.email,
                    email: item.email,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    dateAdd: new Date(item.dateAdd).toLocaleDateString('pl-PL'),
                    roleId: item.roleId,
                    roleName: item.roleName,
                }));

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
                                <h1 className="text-success">Użytkownicy</h1>
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
                                        Dodaj użytkownika!
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="containerUsers pt-5">
                            <DefaultDataTable
                                key={JSON.stringify(rows)}
                                columns={columns}
                                rows={rows}
                                icon={
                                    <PeopleAltIcon
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            name="dateStart"
                                            type="text"
                                            value={formData.email}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Imię:</Form.Label>
                                        <Form.Control
                                            name="dateStart"
                                            type="text"
                                            value={formData.firstName}
                                            placeholder="Wpisz typ"
                                            onChange={handleUserInput}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwisko:</Form.Label>
                                        <Form.Control
                                            name="dateStart"
                                            type="text"
                                            value={formData.lastName}
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

export default Users;
