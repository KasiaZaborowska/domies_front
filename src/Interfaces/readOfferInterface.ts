import animalTypeInterface from './animalTypeInterface';

export default interface readOfferInterface {
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
    photo: string;
}
