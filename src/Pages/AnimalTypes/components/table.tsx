import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetAnimalTypesQuery } from '../../../Apis/animalTypeApi';
import { useDispatch } from 'react-redux';
import { AnimalTypeInterface } from '../../../Interfaces';
import {
    animalTypeSlice,
    setAnimalType,
} from '../../../Store/Redux/animalTypeSlice';
import { useEffect } from 'react';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'animalType', headerName: 'Animal Type', width: 130 },
];

export default function DataTable() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAnimalTypesQuery(null);

    const rows = data.result.map((animalType: AnimalTypeInterface) => ({
        id: animalType.animalTypeId,
        animalType: animalType.type,
    }));
    console.log(data.result);
    console.log(rows);
    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
