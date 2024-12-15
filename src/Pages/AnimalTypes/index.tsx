import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from './components/table';
import { AnimalTypeInterface } from '../../Interfaces';
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
    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    //console.log(data.result);

    return (
        <div>
            <div className="container row">
                <DataTable />

                {/* {data.result.map(
                    (animalType: AnimalTypeInterface, index: number) => (
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
