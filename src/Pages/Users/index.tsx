import React, { useEffect } from 'react';
import { useState } from 'react';
// import ApplicationDataTable from './components/ApplicationTable';
// import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import MainLoader from '../../Components/MainLoader';
import inputHelperUtility from '../../Utils/inputHelperUtility';
import {
    useAddApplicationMutation,
    useDeleteApplicationMutation,
} from '../../Apis/applicationApi';
import DefaultDataTable from '../Applications/components/DefaultTable';
import { useNavigate } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import './Users.css';
import jwt_decode from 'jwt-decode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import dayjs, { Dayjs } from 'dayjs';
import {
    useDeleteUserMutation,
    useDowngradingToUserRoleMutation,
    useGetUsersQuery,
    usePromotionToManagerRoleMutation,
} from '../../Apis/userApi';
import userInterface from '../../Interfaces/userInterface';
import Tooltip from '@mui/material/Tooltip';

function Users() {
    const { data, error, isLoading } = useGetUsersQuery(null);
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [applicationToAdd] = useAddApplicationMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [formData, setFormData] = useState<userInterface>({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        roleId: 0,
        roleName: '',
        dateAdd: '',
    });
    console.log(error);

    const [deleteApplication] = useDeleteApplicationMutation();

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
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

    const getRole = (): string | undefined => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const userRole: {
                Role: string;
            } = jwt_decode(accessToken);
            return userRole.Role.toLowerCase();
        } else {
            //console.error('Brak tokenu!');
            return undefined;
        }
    };
    const role = getRole();
    const columns: GridColDef[] = [
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 250,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'firstName',
            headerName: 'Imię',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'lastName',
            headerName: 'Nazwisko',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'phoneNumber',
            headerName: 'Telefon',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'roleName',
            headerName: 'Rola',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'dateAdd',
            headerName: 'Data dodania',
            minWidth: 150,
            flex: 1,
        },
    ];
    const [rows, setRows] = useState([]);
    // if (!isLoading) {
    //     console.log(data.result);
    // }

    useEffect(() => {
        if (!isLoading) {
            if (data.result && Array.isArray(data.result)) {
                const dataInRows = data.result.map((item: userInterface) => ({
                    id: item.email,
                    email: item.email,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    phoneNumber: item.phoneNumber,
                    dateAdd: new Date(item.dateAdd).toLocaleDateString('pl-PL'),
                    roleId: item.roleId,
                    roleName: item.roleName,
                }));

                setRows(dataInRows); // Ustawiamy dane w stanie
            }
        }
    }, [data, navigate]);

    const [promotionToManagerRole] = usePromotionToManagerRoleMutation();
    const [downgradingToUserRole] = useDowngradingToUserRoleMutation();

    const renderCustomActions = (row: userInterface) => {
        return (
            row.roleName !== 'Admin' && (
                <>
                    <Tooltip title="Zdegradowanie do roli użytkownika">
                        <Button
                            variant="contained"
                            color="success"
                            style={{
                                backgroundColor: 'darkgrey',
                                marginRight: '10px',
                            }}
                            onClick={() => downgradingToUserRole(row)}
                            disabled={row.roleName === 'User'}
                        >
                            <AccountCircleIcon
                                fontSize="medium"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px black',
                                    color: 'black',
                                }}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Promocja do roli moderatora">
                        <Button
                            variant="contained"
                            color="success"
                            style={{
                                backgroundColor: 'darkgrey',
                                marginRight: '10px',
                            }}
                            onClick={() => promotionToManagerRole(row)}
                            disabled={row.roleName === 'Manager'}
                        >
                            <AdminPanelSettingsIcon
                                fontSize="medium"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px black',
                                    color: 'black',
                                }}
                            />
                        </Button>
                    </Tooltip>
                </>
            )
        );
    };

    if (isLoading) {
        return <MainLoader />;
    }
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
                                renderCustomActions={renderCustomActions}
                                //onEdit={handleEdit}
                                onDelete={deleteUser}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Users;
