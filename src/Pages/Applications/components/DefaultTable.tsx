import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputBase } from '@mui/material';
import { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteButtonWithModal from './HandleDelete';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { autoBatchEnhancer, SerializedError } from '@reduxjs/toolkit';

interface DataTableProps {
    columns: GridColDef[];
    rows: any[];
    onEdit?: (row: any) => void;
    onDelete: (
        row: any,
    ) => Promise<
        { data: any } | { error: FetchBaseQueryError | SerializedError }
    >;
    icon: any;
}

const DefaultDataTable: React.FC<DataTableProps> = ({
    columns,
    rows,
    onEdit,
    onDelete,
    icon,
}) => {
    const [filterText, setFilterText] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(
        {},
    );
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setFilterText(query);

        if (!query) {
            setFilteredRows(rows);
        } else {
            const filtered = rows.filter((row) =>
                Object.values(row).some(
                    (value) =>
                        value && value.toString().toLowerCase().includes(query),
                ),
            );
            setFilteredRows(filtered);
        }
    };
    const toggleRowExpand = (rowId: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [rowId]: !prev[rowId],
        }));
    };

    const actionColumn: GridColDef = {
        field: 'actions',
        headerName: 'Akcje',
        width: 200,
        //sortable: false,
        align: 'right',
        renderCell: (params) => {
            const data = params.row.originalData;
            // console.log('params');
            // console.log(params);
            // console.log(typeof params.row.id);
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '10px 0px',
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        //onClick={() => showDeleteModal(true)}
                        onClick={() => onEdit?.(data)}
                    >
                        <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <DeleteButtonWithModal
                        id={params.row.id}
                        deleteFunction={onDelete}
                    />
                </div>
            );
        },
    };
    const processedColumns = columns.map((column, colIndex) => ({
        ...column,
        renderCell: (params: any) => {
            const isFirstColumn = colIndex === 0;
            const isExpanded = expandedRows[params.id];

            if (
                isFirstColumn &&
                params.value &&
                params.value.toString().length > 70
            ) {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            whiteSpace: isExpanded ? 'normal' : 'nowrap',
                            overflow: isExpanded ? 'visible' : 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        onClick={() => toggleRowExpand(params.id.toString())}
                    >
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleRowExpand(params.id.toString());
                            }}
                        >
                            {isExpanded ? <PetsIcon /> : <PetsIcon />}
                        </IconButton>
                        {isExpanded
                            ? params.value
                            : `${params.value.toString().substring(0, 70)}...`}
                    </div>
                );
            }
            return params.value;
        },
    }));

    return (
        <Paper
            sx={{
                height: '100%',
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0px 6px 12px rgba(0,0,0,0.4)',
                padding: '10px',
                margin: '10px, auto',
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
                {icon}
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
                columns={[...processedColumns, actionColumn]}
                style={{
                    wordWrap: 'break-word',
                    fontSize: '16px',
                    margin: '10px',
                    padding: '10px',
                    // : 'right',
                    // alignContent: 'right',
                }}
                getRowHeight={() => 'auto'}
                // getRowHeight={(params) =>
                //     expandedRows[params.id] ? 'auto' : null
                // }
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
                sx={{
                    border: 0,
                    '& .MuiDataGrid-virtualScrollerContent': {
                        justifyContent: 'flex-end', // Przesunięcie kolumn do prawej
                    },
                }}
            />
        </Paper>
    );
};

export default DefaultDataTable;
