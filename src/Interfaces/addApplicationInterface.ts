import animalInterface from './animalInterface';

export default interface addApplicationInterface {
    id?: number;
    dateStart: string;
    dateEnd: string;
    offerId: number;
    toUser?: string;
    applicationDateAdd: string;
    note: string;
    animals: animalInterface[];
}
