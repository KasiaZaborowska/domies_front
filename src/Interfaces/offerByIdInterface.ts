import animalTypeInterface from './animalTypeInterface';
import applicationInterface from './applicationInterface';

export default interface offerByIdInterface {
    id?: number;
    name: string;
    description: string;
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
}
