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
import Application from './components/Application';
import AddOpinion from './components/AddOpinion';
import GradeIcon from '@mui/icons-material/Grade';

function Applications() {
    const { data, isLoading } = useGetApplicationsQuery(null);
    const { data: animals, isLoading: isLoadingAnimals } =
        useGetAnimalsQuery(null);
    // console.log('dataaaa');
    // console.log(data);
    // console.log(animals);
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const [formData, setFormData] = useState<applicationInterface>({
        dateStart: '',
        dateEnd: '',
        offerId: 0,
        applicant: '',
        applicationDateAdd: '',
        note: '',
        animals: [
            {
                petName: '',
                specificDescription: '',
                animalType: 0,
            },
        ],
    });

    const [deleteApplication] = useDeleteApplicationMutation();

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

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
            field: 'applicant',
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
            field: 'note',
            headerName: 'Notatka',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'applicationDateAdd',
            headerName: 'Data aplikowania',
            minWidth: 150,
        },
        // {
        //     field: 'opinion',
        //     headerName: 'opinion',
        //     minWidth: 250,
        //     renderCell: (params) => (
        //         <div style={{ padding: '5px' }}>{params.value}</div>
        //     ),
        // },
    ];
    const [rows, setRows] = useState([]);
    const [offerId, setOfferId] = useState<number>();
    const [selectedRow, setSelectedRow] = useState<any | null>(null); // Przechowuje wybrany wiersz
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stan do otwierania/zamykania modala
    // const [opinion, setOpinion] = useState('');
    // const [isOpinionModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [selectedRow, setSelectedRow] = useState<any | null>(null); // Przechowuje wybrany wiersz
    const [isOpinionModalOpen, setOpinionIsModalOpen] =
        useState<boolean>(false); // Stan do otwierania/zamykania modala

    console.log(rows);

    const handleEdit = async (row: applicationInterface) => {
        if (row && row.id) {
            setSelectedRow(row);
            console.log('row');
            console.log(row);
            const offerId = row.offerId;
            setOfferId(offerId);
            setIsModalOpen(true);
        } else {
            console.error('Brak ID w wierszu do usunięcia:', row);
        }
    };

    const addOpinionHandler = (row: applicationInterface) => {
        setSelectedRow(row);
        setOpinionIsModalOpen(true);
    };

    const renderCustomActions = (row: applicationInterface) => {
        if (!row || !row.id) {
            console.error('brak id');
            return;
        }

        // setSelectedRow(row);
        // console.log('moj modal');
        return (
            <>
                <Button
                    variant="contained"
                    color="success"
                    style={{
                        backgroundColor: 'darkgrey',
                        marginRight: '10px',
                        // borderRadius: '30px',
                    }}
                    onClick={() => addOpinionHandler(row)}
                >
                    <GradeIcon
                        fontSize="medium"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            // marginLeft: '15px',
                            border: '1px black',
                            color: 'gold',
                        }}
                    />
                </Button>
            </>
        );
    };

    useEffect(() => {
        if (!isLoading && !isLoadingAnimals) {
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
                        applicant: item.applicant,
                        applicationDateAdd: new Date(
                            item.applicationDateAdd,
                        ).toLocaleDateString('pl-PL'),
                        petName: item.animals
                            .map((animal) => animal.petName)
                            .join(', '),
                        specificDescription: item.animals
                            .map((animal) => animal.specificDescription)
                            .join(', '),
                        note: item.note,
                    }),
                );

                setRows(dataInRows); // Ustawiamy dane w stanie
                console.log('dataInRows');
                console.log(dataInRows);
            }
        }
    }, [data, navigate]);

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
                                <h1 className="text-success">
                                    Twoje aplikacje
                                </h1>
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
                                renderCustomActions={renderCustomActions}
                                onEdit={handleEdit}
                                onDelete={deleteApplication}
                            />
                        </div>
                        {offerId && (
                            <Application
                                application={selectedRow}
                                offerId={offerId}
                                show={isModalOpen}
                                setShow={setIsModalOpen}
                            />
                        )}

                        <AddOpinion
                            application={selectedRow}
                            show={isOpinionModalOpen}
                            setShow={setOpinionIsModalOpen}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default Applications;
