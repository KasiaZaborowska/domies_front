import animalTypeInterface from './animalTypeInterface';
import applicationInterface from './applicationInterface';
import facilityInterface from './facilityInterface';

export default interface offerByIdInterface {
    id?: number;
    name: string;
    offerDescription: string;
    petSitterDescription: string;
    host: string;
    addressId?: number;
    dateAdd?: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    price: number;
    offerAnimalTypes: string[];
    file?: File | null;
    applications?: applicationInterface[];
    photo: string;
    facilities: facilityInterface[];
}
