import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../../Apis/offerApi';
import MainLoader from '../../MainLoader';
import { Link } from 'react-router-dom';
import AddApplication from '../../../Pages/Applications/components/AddApplication';
import { applicationInterface, offerByIdInterface } from '../../../Interfaces';
import opinionInterface from '../../../Interfaces/opinionInterface';
import { InputBase, Paper } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function OfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    const offerIdToNumber = Number(offerId);
    // console.log(typeof offerIdToNumber);

    const { data, isLoading } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');

    const [rows, setRows] = useState<opinionInterface[]>();
    const [filteredRows, setFilteredRows] = useState<opinionInterface[]>();
    console.log('useGetOfferByIdQuery');
    console.log(data);
    // console.log(data.result.applications);

    useEffect(() => {
        if (isLoading) return;

        const allOpinions = data.result.applications.flatMap(
            (app: applicationInterface) => app.opinions,
        );

        console.log(allOpinions);
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
        console.log(
            allOpinions.map((opinion: opinionInterface) => ({
                id: opinion.id,
                rating: opinion.rating,
                comment: opinion.comment,
                applicationId: opinion.applicationId,
                userEmail: opinion.userEmail,
                opinionDateAdd: opinion.opinionDateAdd,
            })),
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
            field: 'rating',
            headerName: 'Ocena',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '25px' }}>{params.value}</div>
            ),
        },
        {
            field: 'comment',
            headerName: 'Opinia/komentarz',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '25px' }}>{params.value}</div>
            ),
        },
        // {
        //     field: 'applicationId',
        //     headerName: 'applicationId',
        //     minWidth: 300,
        //     renderCell: (params) => (
        //         <div style={{ padding: '5px' }}>{params.value}</div>
        //     ),
        // },
        {
            field: 'userEmail',
            headerName: 'UserEmail',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '25px' }}>{params.value}</div>
            ),
        },
        {
            field: 'opinionDateAdd',
            headerName: 'opinionDateAdd',
            minWidth: 250,
            renderCell: (params) => (
                <div style={{ padding: '25px' }}>{params.value}</div>
            ),
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
        console.log(filteredRows);
        setFilteredRows(filteredRows); // Aktualizacja wyświetlanych wierszy
    };

    return (
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
                        Koszt usługi: {data.result.price}zł /24h
                    </span>
                    <hr />
                    <div className="row pt-4">
                        <span style={{ fontSize: '20px' }} className="pt-2">
                            Adres:
                        </span>
                        <span style={{ fontSize: '20px' }} className="pb-4">
                            {data.result.country}, {data.result.city},
                            {data.result.street}, {data.result.postalCode}
                        </span>
                        <div
                            className="py-3"
                            style={{
                                border: '1px solid lightgrey',
                                borderRadius: '12px',
                            }}
                        >
                            <span style={{ fontSize: '20px' }} className="pt-2">
                                Twój opiekun to: {data.result.name}
                                <br />
                                Kontakt:
                                <br />
                                {data.result.host}
                            </span>
                        </div>
                    </div>
                    <div className="row pt-4 px-5 d-flex justify-content-between">
                        <div className="col-5">
                            <AddApplication offerId={offerIdToNumber} />
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
                    </div>
                    <div>
                        <div className="containerApplicationsForPages pt-5">
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
                </div>
            </div>
        </div>
    );
}

export default OfferDetails;
