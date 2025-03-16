import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { animalInterface, userAccountInterface } from '../../../Interfaces';
import { InputBase } from '@mui/material';
import { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import ActionsColumnAnimals from './ActionsColumnAnimals';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Redux/store';

export default function DataTable({ data }: any) {
    const initialRows = data.result.map((animal: animalInterface) => ({
        id: animal.id,
        petName: animal.petName,
        //owner: animal.owner,
        specificDescription: animal.specificDescription,
        type: animal.type,
        actions: ActionsColumnAnimals,
    }));

    const columns: GridColDef[] = [
        {
            field: 'petName',
            headerName: 'Imię zwierzęcia',
            width: 150,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },
        {
            field: 'specificDescription',
            headerName: 'Opis',
            width: 500,
            minWidth: 300,
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
            field: 'type',
            headerName: 'Rodzaj zwierzęcia',
            width: 150,
            renderCell: (params) => (
                <div style={{ padding: '5px' }}>{params.value}</div>
            ),
        },

        {
            field: 'actions',
            headerName: 'Akcje',
            width: 150,
            align: 'right',
            renderCell: (params) => {
                return (
                    <div style={{ padding: '5px' }}>
                        <ActionsColumnAnimals row={params.row} />
                    </div>
                );
            },
        },
    ];
    const [rows, setRows] = useState<animalInterface[]>(initialRows);
    //const firstViewRows = rows.filter((row) => row.owner === userData.Email);
    //console.log(rows);
    const [filterText, setFilterText] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue); // Aktualizacja tekstu wyszukiwania

        // Filtrowanie danych na podstawie wpisanego tekstu
        const filteredRows = initialRows.filter((row: animalInterface) => {
            const name = row.petName ? row.petName.toLowerCase() : ''; // Sprawdź, czy name jest zdefiniowane
            const specificDescription = row.specificDescription
                ? row.specificDescription.toLowerCase()
                : '';
            const type = row.type ? row.type.toLowerCase() : '';
            return (
                name.includes(searchValue) ||
                specificDescription.includes(searchValue) ||
                type.includes(searchValue)
            );
        });

        setRows(filteredRows); // Aktualizacja wyświetlanych wierszy
    };
    console.log('________________________________');
    console.log(rows);
    return (
        <Paper
            sx={{
                height: '100%',
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
                padding: '10px',
                margin: '10px',
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <PetsIcon
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
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                localeText={{
                    noRowsLabel: 'Brak wierszy',
                    noResultsOverlayLabel: 'Nie znaleziono wyników.',

                    // Column menu text
                    columnMenuLabel: 'Menu',
                    columnMenuShowColumns: 'Pokaż wszystkie kolumny',
                    columnMenuManageColumns: 'Zarządzaj kolumnami',
                    columnMenuFilter: 'Filtr',
                    columnMenuHideColumn: 'Ukryj',
                    columnMenuUnsort: 'Anuluj sortowanie',
                    columnMenuSortAsc: 'Sortuj rosnąco',
                    columnMenuSortDesc: 'Sortuj malejąco',
                    footerTotalRows: 'Łączna liczba wierszy:',

                    // Column header text
                    columnHeaderFiltersTooltipActive: (count) =>
                        `Liczba aktywnych filtrów: ${count}`,
                    columnHeaderFiltersLabel: 'Pokaż filtry',
                    columnHeaderSortIconLabel: 'Sortuj',

                    // Filter panel text
                    filterPanelAddFilter: 'Dodaj filtr',
                    filterPanelRemoveAll: 'Usuń wszystkie',
                    filterPanelDeleteIconLabel: 'Usuń',
                    filterPanelLogicOperator: 'Operator logiczny',
                    filterPanelOperator: 'Operator',
                    filterPanelOperatorAnd: 'I',
                    filterPanelOperatorOr: 'Lub',
                    filterPanelColumns: 'Kolumny',
                    filterPanelInputLabel: 'Wartość',
                    filterPanelInputPlaceholder: 'Filtrowana wartość',

                    // Filter operators text
                    filterOperatorContains: 'zawiera',
                    // filterOperatorDoesNotContain: 'does not contain',
                    filterOperatorEquals: 'równa się',
                    // filterOperatorDoesNotEqual: 'does not equal',
                    filterOperatorStartsWith: 'zaczyna się od',
                    filterOperatorEndsWith: 'kończy się na',
                    filterOperatorIs: 'równa się',
                    filterOperatorNot: 'różne',
                    filterOperatorAfter: 'większe niż',
                    filterOperatorOnOrAfter: 'większe lub równe',
                    filterOperatorBefore: 'mniejsze niż',
                    filterOperatorOnOrBefore: 'mniejsze lub równe',
                    filterOperatorIsEmpty: 'jest pusty',
                    filterOperatorIsNotEmpty: 'nie jest pusty',
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
    );
}
