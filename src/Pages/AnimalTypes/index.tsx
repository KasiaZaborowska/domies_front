import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from './components/table';
import { animalTypeInterface } from '../../Interfaces';
import { useGetAnimalTypesQuery } from '../../Apis/animalTypeApi';
import { useDispatch } from 'react-redux';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';

function AnimalTypes() {
    // const [animalTypes, setAnimalTypes] = useState<AnimalTypeInterface[]>([]);

    const dispatch = useDispatch();
    const { data, isLoading } = useGetAnimalTypesQuery(null);

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
    }, [isLoading, data, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container pt-5">
                <DataTable data={data || []} />

                {/* {data.result.map(
                    (animalType: animalTypeInterface, index: number) => (
                        <div key={index}>
                            <p>{animalType.type}</p>
                        </div>
                    ),
                )} */}
            </div>
        </div>
    );
}

export default AnimalTypes;
