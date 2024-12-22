import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { animalTypeInterface } from '../../../Interfaces';
import ActionsColumn from './ActionsColumn';

export default function DataTable({ data }: any) {
    const rows = data.result.map((animalType: animalTypeInterface) => ({
        id: animalType.animalTypeId,
        type: animalType.type,
        actions: ActionsColumn,
    }));
    // console.log(rows);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'type', headerName: 'Animal Type', width: 490 },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            align: 'right',
            renderCell: (params) => {
                return <ActionsColumn row={params.row} />;
            },
        },
    ];
    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
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
