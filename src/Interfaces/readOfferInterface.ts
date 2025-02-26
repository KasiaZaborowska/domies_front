import animalTypeInterface from './animalTypeInterface';
import applicationInterface from './applicationInterface';

export default interface readOfferInterface {
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
    photo: string;
    applications?: applicationInterface[];
}
