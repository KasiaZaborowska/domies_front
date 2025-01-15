import animalInterface from './animalInterface';

export default interface applicationInterface {
    id?: number;
    dateStart: string;
    dateEnd: string;
    offerId?: number;
    toUser?: string;
    applicationDateAdd: string;
    animals: animalInterface[];
}
