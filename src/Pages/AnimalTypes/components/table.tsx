import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { animalTypeInterface } from '../../../Interfaces';
interface DataTableProps {
    result: animalTypeInterface[];
}

export default function DataTable({ data }: any) {
    console.log(data);
    const rows = data.result.map((animalType: animalTypeInterface) => ({
        id: animalType.animalTypeId,
        type: animalType.type,
    }));
    console.log(rows);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'type', headerName: 'Animal Type', width: 190 },
    ];

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
                //checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
