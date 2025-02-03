import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../Apis/offerApi';
import MainLoader from '../../Components/MainLoader';
import { Modal } from 'react-bootstrap';
import EditOfferForm from '../Offers/EditOffer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    applicationInterface,
    applicationTableInterface,
} from '../../Interfaces';
import DefaultDataTable from '../Applications/components/DefaultTable';
import EmailIcon from '@mui/icons-material/Email';
import { InputBase, Paper } from '@mui/material';

function MyOfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    const { data, isLoading } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [filterText, setFilterText] = useState('');

    const [rows, setRows] = useState<applicationTableInterface[]>();
    const [filteredRows, setFilteredRows] =
        useState<applicationTableInterface[]>();

    useEffect(() => {
        if (isLoading) return;

        const dataToSet = data.result.applications.map(
            (application: applicationInterface) => ({
                id: application.id,
                dateStart: application.dateStart.split('T')[0],
                //owner: animal.owner,
                dateEnd: application.dateEnd.split('T')[0],
                toUser: application.toUser,
                note: application.note,
                petName: application.animals
                    .map((animal) => animal.petName)
                    .join(', '),
                specificDescription: application.animals.map((animal) => {
                    return {
                        applicationId: application.id,
                        description: animal.specificDescription,
                    };
                }),
                type: application.animals
                    .map((animal) => animal.type)
                    .join(', '),
            }),
        );

        setRows(dataToSet);
        setFilteredRows(dataToSet);
        console.log(
            data.result.applications.map(
                (application: applicationInterface) => ({
                    id: application.id,
                    dateStart: application.dateStart,
                    //owner: animal.owner,
                    dateEnd: application.dateEnd,
                    toUser: application.toUser,
                    note: application.note,
                    petName: application.animals
                        .map((animal) => animal.petName)
                        .join(', '),
                }),
            ),
        );
    }, [isLoading]);

    if (isLoading) {
        return (
            <div
                className="d-flex justify-content-center"
                style={{ width: '100%' }}
            >
                <MainLoader />
            </div>
        );
    }

    const columns: GridColDef[] = [
        {
            field: 'dateStart',
            headerName: 'Data początkowa',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'dateEnd',
            headerName: 'Data końcowa',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'toUser',
            headerName: 'Użytkownik',
            minWidth: 200,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'petName',
            headerName: 'Imię/Imiona',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
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
                        padding: '15px',
                    }}
                >
                    {params.value.map((data: any) => (
                        <div key={`${data.applicationId}${data.description}`}>
                            <div>{data.description}</div> <hr />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'type',
            headerName: 'Typ',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'note',
            headerName: 'Notatka',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'applicationDateAdd',
            headerName: 'Data aplikowania',
            minWidth: 150,
        },
    ];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue); // Aktualizacja tekstu wyszukiwania

        // Filtrowanie danych na podstawie wpisanego tekstu
        if (!rows) return;

        const filteredRows = rows.filter((row: applicationTableInterface) => {
            const dateStart = row.dateStart ? row.dateStart.toLowerCase() : ''; // Sprawdź, czy name jest zdefiniowane
            const dateEnd = row.dateEnd ? row.dateEnd.toLowerCase() : '';
            const toUser = row.toUser ? row.toUser.toLowerCase() : '';
            const note = row.note ? row.note.toLowerCase() : '';
            return (
                dateStart.includes(searchValue) ||
                dateEnd.includes(searchValue) ||
                toUser.includes(searchValue) ||
                note.includes(searchValue)
            );
        });

        setFilteredRows(filteredRows); // Aktualizacja wyświetlanych wierszy
    };
    // if (!isLoading) {
    //     console.log(data.result);
    // }

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center w-full h-full pt-5">
                    <MainLoader />
                </div>
            ) : (
                <div className="container">
                    <div className="">
                        <div className="p-4" style={{ background: '#edede9' }}>
                            <div className="">
                                <div className="d-flex p-2 justify-content-center">
                                    <img
                                        src={data.result.photo}
                                        //width="100%"
                                        style={{
                                            borderRadius: '10%',
                                            maxHeight: '60vh',
                                            minWidth: '40vw',

                                            objectFit: 'cover',
                                        }}
                                        className="col-10"
                                        alt="No content"
                                    ></img>
                                </div>
                            </div>
                            <h2
                                className="pt-4 pb-3"
                                style={{
                                    color: 'black',
                                }}
                            >
                                {data.result.name}
                            </h2>
                            <span>
                                <span
                                    className="badge pt-2"
                                    style={{
                                        height: '40px',
                                        fontSize: '20px',
                                        backgroundColor: '#5e503f',
                                    }}
                                >
                                    Typy akceptowanych zwierząt:
                                </span>
                            </span>
                            <span>
                                <span
                                    className="badge pt-2"
                                    style={{
                                        height: '40px',
                                        fontSize: '20px',
                                        color: '#5e503f',
                                    }}
                                >
                                    {data.result.offerAnimalTypes}
                                </span>
                            </span>
                            <p style={{ fontSize: '20px' }} className="py-3">
                                {data.result.description}
                            </p>
                            <hr />
                            <span className="h3">
                                Koszt usługi: {data.result.price}zł
                            </span>
                            <hr />
                            <div className="row pt-4">
                                <span
                                    style={{ fontSize: '20px' }}
                                    className="pt-2"
                                >
                                    Adres:
                                </span>
                                <span
                                    style={{ fontSize: '20px' }}
                                    className="pb-4"
                                >
                                    {data.result.country}, {data.result.city},
                                    {data.result.street},{' '}
                                    {data.result.postalCode}
                                </span>
                                <div
                                    className="py-3"
                                    style={{
                                        border: '1px solid lightgrey',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <span
                                        style={{ fontSize: '20px' }}
                                        className="pt-2"
                                    >
                                        Twój opiekun to: {data.result.name}
                                        <br />
                                        Kontakt:
                                        <br />
                                        {data.result.host}
                                    </span>
                                </div>
                                {/* <p style={{ fontSize: '20px' }} className="py-3">
                            aaa
                            {data.result.applications}
                        </p> */}
                            </div>
                            <div className="row pt-4 px-5 d-flex justify-content-between">
                                <div className="col-5">
                                    <button
                                        onClick={handleShow}
                                        className="btn form-control"
                                        style={{
                                            height: '40px',
                                            padding: '1px',
                                            fontSize: '20px',
                                            backgroundColor: '#5e503f',
                                            color: 'white',
                                        }}
                                    >
                                        Edytuj
                                    </button>
                                </div>

                                <div className="col-5 ">
                                    <button
                                        className="btn btn-secondary form-control"
                                        onClick={() => navigate(-1)}
                                        style={{
                                            height: '40px',
                                            padding: '1px',
                                            fontSize: '20px',
                                            backgroundColor: '#e9e6e2',
                                            color: '#2b2628',
                                        }}
                                    >
                                        Powrót
                                    </button>
                                </div>

                                <div>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        dialogClassName="modal-dialog"
                                        size="lg"
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                Edytuj ofertę:
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditOfferForm />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>

                            <div className="containerApplicationsForPages pt-5">
                                <Paper
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: '15px',
                                        boxShadow:
                                            '0px 6px 12px rgba(0,0,0,0.3)',
                                        padding: '10px',
                                        margin: '10px',
                                        overflow: 'auto',
                                    }}
                                    style={{ background: '#fbfbf8db' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <EmailIcon
                                            fontSize="large"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '15px',
                                            }}
                                        />
                                        <InputBase
                                            value={filterText}
                                            onChange={handleSearchChange}
                                            placeholder="Szukaj..."
                                            style={{
                                                width: '150px',
                                                padding: '10px',
                                                borderRadius: '15px',
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        />
                                    </div>
                                    <DataGrid
                                        rows={filteredRows}
                                        columns={columns}
                                        getRowHeight={() => 'auto'}
                                        localeText={{
                                            noRowsLabel: 'Brak wierszy',
                                            noResultsOverlayLabel:
                                                'Nie znaleziono wyników.',

                                            // Column menu text
                                            columnMenuLabel: 'Menu',
                                            columnMenuShowColumns:
                                                'Pokaż wszystkie kolumny',
                                            columnMenuManageColumns:
                                                'Zarządzaj kolumnami',
                                            columnMenuFilter: 'Filtr',
                                            columnMenuHideColumn: 'Ukryj',
                                            columnMenuUnsort:
                                                'Anuluj sortowanie',
                                            columnMenuSortAsc: 'Sortuj rosnąco',
                                            columnMenuSortDesc:
                                                'Sortuj malejąco',
                                            footerTotalRows:
                                                'Łączna liczba wierszy:',

                                            // Column header text
                                            columnHeaderFiltersTooltipActive: (
                                                count,
                                            ) =>
                                                `Liczba aktywnych filtrów: ${count}`,
                                            columnHeaderFiltersLabel:
                                                'Pokaż filtry',
                                            columnHeaderSortIconLabel: 'Sortuj',

                                            // Filter panel text
                                            filterPanelAddFilter: 'Dodaj filtr',
                                            filterPanelRemoveAll:
                                                'Usuń wszystkie',
                                            filterPanelDeleteIconLabel: 'Usuń',
                                            filterPanelLogicOperator:
                                                'Operator logiczny',
                                            filterPanelOperator: 'Operator',
                                            filterPanelOperatorAnd: 'I',
                                            filterPanelOperatorOr: 'Lub',
                                            filterPanelColumns: 'Kolumny',
                                            filterPanelInputLabel: 'Wartość',
                                            filterPanelInputPlaceholder:
                                                'Filtrowana wartość',

                                            // Filter operators text
                                            filterOperatorContains: 'zawiera',
                                            // filterOperatorDoesNotContain: 'does not contain',
                                            filterOperatorEquals: 'równa się',
                                            // filterOperatorDoesNotEqual: 'does not equal',
                                            filterOperatorStartsWith:
                                                'zaczyna się od',
                                            filterOperatorEndsWith:
                                                'kończy się na',
                                            filterOperatorIs: 'równa się',
                                            filterOperatorNot: 'różne',
                                            filterOperatorAfter: 'większe niż',
                                            filterOperatorOnOrAfter:
                                                'większe lub równe',
                                            filterOperatorBefore:
                                                'mniejsze niż',
                                            filterOperatorOnOrBefore:
                                                'mniejsze lub równe',
                                            filterOperatorIsEmpty: 'jest pusty',
                                            filterOperatorIsNotEmpty:
                                                'nie jest pusty',
                                            filterOperatorIsAnyOf:
                                                'jest jednym z',
                                        }}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    page: 0,
                                                    pageSize: 5,
                                                },
                                            },
                                            columns: {
                                                columnVisibilityModel: {
                                                    id: false,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        //checkboxSelection
                                        sx={{ border: 0 }}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOfferDetails;
