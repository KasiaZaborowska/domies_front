import React, { useEffect } from 'react';
import { offerByIdInterface } from '../../Interfaces';
import CottageIcon from '@mui/icons-material/Cottage';
import ChairIcon from '@mui/icons-material/Chair';
import PetsIcon from '@mui/icons-material/Pets';
import facilityInterface from '../../Interfaces/facilityInterface';

function Facilities(data: any, isLoading: boolean) {
    const FacilityIcon = ({ type }: { type: string }) => {
        switch (type) {
            case 'home_type':
                return (
                    <CottageIcon
                        fontSize="large"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '15px',
                        }}
                    />
                );
            case 'no_restrictions':
                return (
                    <ChairIcon
                        fontSize="large"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '15px',
                        }}
                    />
                );
            case 'environment':
                return (
                    <PetsIcon
                        fontSize="large"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '15px',
                        }}
                    />
                );
            default:
                return (
                    <PetsIcon
                        fontSize="large"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '15px',
                        }}
                    />
                );
        }
    };
    // if (!isLoading) {
    //     console.log('data');
    //     console.log(data?.facilities);
    // }

    useEffect(() => {}, [data]);

    if (!data.data.facilities || data.data.facilities.length === 0) {
        return <div>No facilities available</div>;
    }

    return (
        <>
            <div>
                {data.data.facilities.map((facility: facilityInterface) => (
                    <div
                        key={facility.id}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <FacilityIcon type={facility.facilitiesType} />
                        <div
                            style={{ fontSize: '20px', marginLeft: '10px' }}
                            className="py-3"
                        >
                            {facility.facilitiesDescription}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Facilities;
