import animalInterface from './animalInterface';

export default interface applicationTableInterface {
    id?: number;
    dateStart: string;
    dateEnd: string;
    offerId: number;
    toUser?: string;
    applicationDateAdd: string;
    note: string;
    petName: animalInterface[];
}
