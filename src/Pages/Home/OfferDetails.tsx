import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../Apis/offerApi';
import MainLoader from '../../Components/MainLoader';
import AddApplication from '../Applications/components/AddApplication';
import { applicationInterface } from '../../Interfaces';
import opinionInterface from '../../Interfaces/opinionInterface';
import { InputBase, Paper } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { isAuthBoolean } from '../../Utils/authUtils';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import OfferDetailsStyle from '../OfferDetailsStyle';
import Facilities from '../Offers/Facilities';
import Tooltip from '@mui/material/Tooltip';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function OfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    const offerIdToNumber = Number(offerId);

    const { data, isLoading, error } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');

    const [rows, setRows] = useState<opinionInterface[]>();
    const [filteredRows, setFilteredRows] = useState<opinionInterface[]>();

    useEffect(() => {
        if (isLoading) return;

        const allOpinions = data.result.applications.flatMap(
            (app: applicationInterface) => app.opinions,
        );
        const dataToSet = allOpinions.map((opinion: opinionInterface) => ({
            id: opinion.id,
            rating: opinion.rating,
            comment: opinion.comment,
            applicationId: opinion.applicationId,
            userEmail: opinion.userEmail,
            opinionDateAdd: opinion.opinionDateAdd,
        }));

        setRows(dataToSet);
        setFilteredRows(dataToSet);
        // console.log(
        //     allOpinions.map((opinion: opinionInterface) => ({
        //         id: opinion.id,
        //         rating: opinion.rating,
        //         comment: opinion.comment,
        //         applicationId: opinion.applicationId,
        //         userEmail: opinion.userEmail,
        //         opinionDateAdd: opinion.opinionDateAdd,
        //     })),
        // );
    }, [isLoading]);

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

    const HalfRating = (value: number) => {
        return (
            <Stack spacing={1}>
                <Rating
                    name="half-rating-read"
                    value={value}
                    precision={0.5}
                    readOnly
                />
            </Stack>
        );
    };

    const columns: GridColDef[] = [
        {
            field: 'rating',
            headerName: 'Ocena',
            minWidth: 160,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>
                    {HalfRating(params.value)}
                </div>
            ),
        },
        {
            field: 'comment',
            headerName: 'Opinia/komentarz',
            minWidth: 230,
            flex: 2,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        // {
        //     field: 'applicationId',
        //     headerName: 'applicationId',
        //     minWidth: 300,
        //     renderCell: (params) => (
        //         <div style={{ padding: '5px' }}>{params.value}</div>
        //     ),
        // }
        {
            field: 'userEmail',
            headerName: 'Email',
            minWidth: 160,
            flex: 1,
            renderCell: (params) => (
                <div style={{ padding: '15px' }}>{params.value}</div>
            ),
        },
        {
            field: 'opinionDateAdd',
            headerName: 'Data dodania opinii',
            minWidth: 160,
            flex: 1,
            renderCell: (params) => {
                const formattedDate = params.value
                    ? formatDate(params.value)
                    : '';
                return <div style={{ padding: '15px' }}>{formattedDate}</div>;
            },
        },
    ];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue); // Aktualizacja tekstu wyszukiwania

        // Filtrowanie danych na podstawie wpisanego tekstu
        if (!rows) return;

        const filteredRows = rows.filter((row: opinionInterface) => {
            const rating = row.rating ? row.rating : ''; // Sprawdź, czy name jest zdefiniowane
            const comment = row.comment ? row.comment.toLowerCase() : '';
            const userEmail = row.userEmail ? row.userEmail.toLowerCase() : '';
            const opinionDateAdd = row.opinionDateAdd
                ? row.opinionDateAdd.toLowerCase()
                : '';
            return (
                rating.toString().includes(searchValue) ||
                comment.includes(searchValue) ||
                userEmail.includes(searchValue) ||
                opinionDateAdd.includes(searchValue)
            );
        });
        setFilteredRows(filteredRows); // Aktualizacja wyświetlanych wierszy
    };
    const formatPhoneNumber = (phone: string): string => {
        return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    };
    return (
        <div className="container">
            <div className="">
                <OfferDetailsStyle>
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
                    <p style={{ fontSize: '20px' }} className="py-3">
                        {data.result.offerDescription}
                    </p>
                    <hr />
                    <h3 style={{ marginTop: '20px' }}>O mnie</h3>
                    <p style={{ fontSize: '20px' }} className="py-3">
                        {data.result.petSitterDescription}
                    </p>{' '}
                    <hr />
                    <h3 style={{ marginTop: '20px' }}>Udogodnienia</h3>
                    <div style={{ fontSize: '20px' }} className="py-3">
                        <Facilities data={data.result} isLoading={isLoading} />
                    </div>
                    <span className="h3">
                        Koszt usługi:{' '}
                        {data.result.price.toString().replace('.', ',')}zł /24h
                    </span>
                    <hr />
                    <div className="row pt-4">
                        <span
                            style={{ fontSize: '20px', display: 'flex' }}
                            className="pt-2"
                        >
                            <PersonPinCircleIcon
                                fontSize="large"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            />
                            <h3 style={{ marginTop: '20px' }}>
                                Adres opiekuna
                            </h3>
                        </span>
                        <span
                            style={{ fontSize: '20px', marginLeft: '36px' }}
                            className="pb-4"
                        >
                            {data.result.country}, {data.result.city},{' '}
                            {data.result.street}, {data.result.postalCode}
                        </span>
                        <div
                            className="py-3"
                            style={{
                                border: '1px solid lightgrey',
                                borderRadius: '12px',
                            }}
                        >
                            <span
                                style={{ fontSize: '20px', display: 'flex' }}
                                className="pt-2"
                            >
                                <AccountCircleIcon
                                    fontSize="medium"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '16px',
                                    }}
                                />
                                <h3
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '2px',
                                    }}
                                >
                                    Twój opiekun to
                                </h3>{' '}
                            </span>
                            <span
                                style={{
                                    fontSize: '20px',
                                    marginLeft: '36px',
                                }}
                                className="pb-4"
                            >
                                {data.result.name}
                            </span>
                            <span
                                style={{ fontSize: '20px', display: 'flex' }}
                                className="pt-2"
                            >
                                <MailOutlineIcon
                                    fontSize="medium"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '18px',
                                    }}
                                />
                                <h3
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '2px',
                                    }}
                                >
                                    Kontakt
                                </h3>
                            </span>
                            <span style={{ fontSize: '20px' }} className="pt-2">
                                <div
                                    style={{
                                        fontSize: '20px',
                                        marginLeft: '36px',
                                    }}
                                >
                                    {' '}
                                    Adres e-mail: {data.result.host}
                                </div>

                                <div
                                    style={{
                                        fontSize: '20px',
                                        marginLeft: '36px',
                                    }}
                                >
                                    Numer telefonu:{' '}
                                    {formatPhoneNumber(
                                        data.result.hostPhoneNumber,
                                    )}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row pt-4 px-5 d-flex justify-content-between">
                        <div className="col-5">
                            {(isAuthBoolean() && (
                                <AddApplication offerId={offerIdToNumber} />
                            )) || (
                                <Tooltip title="Zaloguj się aby zarezerwować!">
                                    <button
                                        className="btn form-control responsive_button"
                                        style={{
                                            height: '40px',
                                            padding: '1px',
                                            backgroundColor: '#5e503f',
                                            color: 'white',
                                        }}
                                        onClick={() => {
                                            navigate('/signIn');
                                        }}
                                    >
                                        Zaloguj się aby zarezerwować!
                                    </button>
                                </Tooltip>
                            )}
                        </div>

                        <div className="col-5 ">
                            <Tooltip title="Powrót do strony głównej">
                                <button
                                    className="btn btn-secondary form-control responsive_button"
                                    onClick={() => navigate(-1)}
                                    style={{
                                        height: '40px',
                                        padding: '1px',
                                        backgroundColor: '#e9e6e2',
                                        color: '#2b2628',
                                    }}
                                >
                                    Powrót
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginTop: '50px' }}>Opinie</h3>
                        <div className="containerApplicationsForPages pt-3">
                            <Paper
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '15px',
                                    boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
                                    padding: '10px',
                                    // margin: '10px',
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
                                    <CommentIcon
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
                                        columnMenuUnsort: 'Anuluj sortowanie',
                                        columnMenuSortAsc: 'Sortuj rosnąco',
                                        columnMenuSortDesc: 'Sortuj malejąco',
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
                                        filterPanelRemoveAll: 'Usuń wszystkie',
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
                                        filterOperatorEndsWith: 'kończy się na',
                                        filterOperatorIs: 'równa się',
                                        filterOperatorNot: 'różne',
                                        filterOperatorAfter: 'większe niż',
                                        filterOperatorOnOrAfter:
                                            'większe lub równe',
                                        filterOperatorBefore: 'mniejsze niż',
                                        filterOperatorOnOrBefore:
                                            'mniejsze lub równe',
                                        filterOperatorIsEmpty: 'jest pusty',
                                        filterOperatorIsNotEmpty:
                                            'nie jest pusty',
                                        filterOperatorIsAnyOf: 'jest jednym z',
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
                </OfferDetailsStyle>
            </div>
        </div>
    );
}

export default OfferDetails;
