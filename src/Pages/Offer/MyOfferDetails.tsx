import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../Apis/offerApi';
import MainLoader from '../../Components/MainLoader';
import { Container, Modal, Row } from 'react-bootstrap';
import EditOfferForm from '../Offers/EditOffer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    applicationInterface,
    applicationTableInterface,
} from '../../Interfaces';
// import DefaultDataTable from '../Applications/components/DefaultTable';
import EmailIcon from '@mui/icons-material/Email';
import { InputBase, Paper } from '@mui/material';
import Facilities from './Facilities';
import {
    useAcceptApplicationMutation,
    useRejectApplicationMutation,
} from '../../Apis/applicationApi';
import OfferDetailsStyle from '../OfferDetailsStyle';

function MyOfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    const { data, isLoading, refetch } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [filterText, setFilterText] = useState('');

    const [rows, setRows] = useState<applicationTableInterface[]>();
    const [filteredRows, setFilteredRows] =
        useState<applicationTableInterface[]>();
    console.log(data);

    // Application Status
    const [applicationStatusState, setApplicationStatus] = useState<
        applicationInterface[]
    >([]);

    const [acceptApplication] = useAcceptApplicationMutation();
    const [rejectApplication] = useRejectApplicationMutation();

    const updateStatus = (id: number, status: string) => {
        setApplicationStatus((prevState) =>
            prevState.map((applicationStatusState) =>
                applicationStatusState.id === id
                    ? { ...applicationStatusState, applicationStatus: status }
                    : applicationStatusState,
            ),
        );
    };

    const handleAccept = async (id: number) => {
        try {
            const response = await acceptApplication({ id }).unwrap();

            if (response?.data) {
                updateStatus(id, 'Accepted'); // Zmiana statusu w stanie
            }
            await refetch();
        } catch (error) {
            console.error('Błąd przy akceptacji', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            const response = await rejectApplication({ id }).unwrap();

            if (response?.data) {
                updateStatus(id, 'Rejected'); // Zmiana statusu w stanie
            }
            await refetch();
        } catch (error) {
            console.error('Błąd przy odrzuceniu', error);
        }
    };

    useEffect(() => {
        if (isLoading) return;

        const dataToSet = data.result.applications.map(
            (application: applicationInterface) => ({
                id: application.id,
                dateStart: application.dateStart.split('T')[0],
                dateEnd: application.dateEnd.split('T')[0],
                applicant: application.applicant,
                note: application.note,
                applicationDateAdd: application.applicationDateAdd,
                applicationStatus: application.applicationStatus,
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
                    applicant: application.applicant,
                    note: application.note,
                    petName: application.animals
                        .map((animal) => animal.petName)
                        .join(', '),
                }),
            ),
        );
    }, [isLoading, applicationStatusState, data]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD
    };

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
            field: 'applicant',
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
            renderCell: (params) => {
                const formattedDate = params.value
                    ? formatDate(params.value)
                    : '';
                return <div style={{ padding: '15px' }}>{formattedDate}</div>;
            },
        },
        {
            field: 'applicationStatus',
            headerName: 'Status',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>
                    {params.value}
                    <div style={{ marginTop: '10px' }}>
                        <button
                            style={{ marginRight: '10px', borderRadius: '5px' }}
                            onClick={() => handleAccept(params.row.id)}
                            disabled={
                                params.row.applicationStatus ===
                                    'Zaakceptowana' ||
                                params.row.applicationStatus === 'Odrzucona'
                            }
                        >
                            Akceptuj
                        </button>
                        <button
                            style={{ marginRight: '10px', borderRadius: '5px' }}
                            onClick={() => handleReject(params.row.id)}
                            disabled={
                                params.row.applicationStatus ===
                                    'Zaakceptowana' ||
                                params.row.applicationStatus === 'Odrzucona'
                            }
                        >
                            Odrzuć
                        </button>
                    </div>
                </div>
            ),
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
            const applicant = row.applicant ? row.applicant.toLowerCase() : '';
            const note = row.note ? row.note.toLowerCase() : '';
            return (
                dateStart.includes(searchValue) ||
                dateEnd.includes(searchValue) ||
                applicant.includes(searchValue) ||
                note.includes(searchValue)
            );
        });

        setFilteredRows(filteredRows); // Aktualizacja wyświetlanych wierszy
    };
    if (!isLoading) {
        console.log('data');
        console.log(data.result);
    }

    // Metoda do aktualizacji statusu

    return (
        <>
            {isLoading || !data.result ? (
                <div className="flex justify-center items-center w-full h-full pt-5">
                    <MainLoader />
                </div>
            ) : (
                <>
                    <div className="container">
                        <div className="">
                            <OfferDetailsStyle>
                                {/* <Row className="justify-content-md-center"> */}

                                <img
                                    src={data.result.photo}
                                    //width="100%"
                                    style={{
                                        borderRadius: '10%',
                                        maxHeight: '60vh',
                                        minWidth: '40vw',

                                        objectFit: 'cover',
                                    }}
                                    className="col-10 img-fluid"
                                    alt="No content"
                                ></img>

                                {/* </Row> */}
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
                                <h3 style={{ marginTop: '20px' }}>O ofercie</h3>
                                <p
                                    style={{ fontSize: '20px' }}
                                    className="py-3"
                                >
                                    {data.result.offerDescription}
                                </p>
                                <hr />
                                <h3 style={{ marginTop: '20px' }}>O mnie</h3>
                                <p
                                    style={{ fontSize: '20px' }}
                                    className="py-3"
                                >
                                    {data.result.petSitterDescription}
                                </p>
                                <hr />
                                <h3 style={{ marginTop: '20px' }}>
                                    Udogodnienia
                                </h3>
                                <div
                                    style={{ fontSize: '20px' }}
                                    className="py-3"
                                >
                                    <Facilities
                                        data={data.result}
                                        isLoading={isLoading}
                                    />
                                </div>
                                <span className="h3">
                                    Koszt usługi:{' '}
                                    {data.result.price
                                        .toString()
                                        .replace('.', ',')}
                                    zł / 24h
                                </span>
                                <hr />
                                <div className="row pt-4">
                                    <span
                                        style={{ fontSize: '20px' }}
                                        className="pt-2"
                                    >
                                        <h3 style={{ marginTop: '20px' }}>
                                            Adres
                                        </h3>
                                    </span>
                                    <span
                                        style={{ fontSize: '20px' }}
                                        className="pb-4"
                                    >
                                        {data.result.country},{' '}
                                        {data.result.city},{data.result.street},{' '}
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
                                            <h3
                                                style={{
                                                    marginTop: '20px',
                                                }}
                                            >
                                                Twój opiekun to
                                            </h3>
                                            {data.result.name}
                                            <br />
                                            <h3
                                                style={{
                                                    marginTop: '20px',
                                                }}
                                            >
                                                Kontakt
                                            </h3>
                                            {data.result.host}
                                        </span>
                                    </div>
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
                                <h3 style={{ marginTop: '50px' }}>
                                    Aplikacje do Twojej oferty
                                </h3>
                                <div className="containerApplicationsForPages pt-3">
                                    <Paper
                                        sx={{
                                            width: '100%', // Ustawia szerokość na 100% ekranu
                                            maxWidth: '1200px', // Maksymalna szerokość
                                            margin: 'auto', // Centruje komponent
                                            padding: '20px', // Padding
                                            height: 'auto', // Automatyczna wysokość, możesz dostosować
                                            boxSizing: 'border-box',
                                            '@media (min-width: 600px)': {
                                                padding: '10px', // Zmniejsza padding na małych ekranach
                                                maxWidth: '89vw', // Ustawia mniejszą szerokość na małych ekranach
                                            },
                                            '@media (min-width: 400px)': {
                                                padding: '5px', // Zmniejsza padding jeszcze bardziej
                                                maxWidth: '89vw', // Mniejsza szerokość na bardzo małych ekranach
                                            },
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
                                                columnMenuSortAsc:
                                                    'Sortuj rosnąco',
                                                columnMenuSortDesc:
                                                    'Sortuj malejąco',
                                                footerTotalRows:
                                                    'Łączna liczba wierszy:',

                                                // Column header text
                                                columnHeaderFiltersTooltipActive:
                                                    (count) =>
                                                        `Liczba aktywnych filtrów: ${count}`,
                                                columnHeaderFiltersLabel:
                                                    'Pokaż filtry',
                                                columnHeaderSortIconLabel:
                                                    'Sortuj',

                                                // Filter panel text
                                                filterPanelAddFilter:
                                                    'Dodaj filtr',
                                                filterPanelRemoveAll:
                                                    'Usuń wszystkie',
                                                filterPanelDeleteIconLabel:
                                                    'Usuń',
                                                filterPanelLogicOperator:
                                                    'Operator logiczny',
                                                filterPanelOperator: 'Operator',
                                                filterPanelOperatorAnd: 'I',
                                                filterPanelOperatorOr: 'Lub',
                                                filterPanelColumns: 'Kolumny',
                                                filterPanelInputLabel:
                                                    'Wartość',
                                                filterPanelInputPlaceholder:
                                                    'Filtrowana wartość',

                                                // Filter operators text
                                                filterOperatorContains:
                                                    'zawiera',
                                                // filterOperatorDoesNotContain: 'does not contain',
                                                filterOperatorEquals:
                                                    'równa się',
                                                // filterOperatorDoesNotEqual: 'does not equal',
                                                filterOperatorStartsWith:
                                                    'zaczyna się od',
                                                filterOperatorEndsWith:
                                                    'kończy się na',
                                                filterOperatorIs: 'równa się',
                                                filterOperatorNot: 'różne',
                                                filterOperatorAfter:
                                                    'większe niż',
                                                filterOperatorOnOrAfter:
                                                    'większe lub równe',
                                                filterOperatorBefore:
                                                    'mniejsze niż',
                                                filterOperatorOnOrBefore:
                                                    'mniejsze lub równe',
                                                filterOperatorIsEmpty:
                                                    'jest pusty',
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
                            </OfferDetailsStyle>
                        </div>
                    </div>
                    {/* </Container> */}
                </>
            )}
        </>
    );
}

export default MyOfferDetails;
