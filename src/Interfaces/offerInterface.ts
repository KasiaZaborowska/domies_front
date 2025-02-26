import animalTypeInterface from './animalTypeInterface';

export default interface offerInterface {
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
}
