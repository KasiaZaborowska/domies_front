import animalInterface from './animalInterface';

export default interface applicationTableInterface {
    id?: number;
    dateStart: string;
    dateEnd: string;
    offerId: number;
    applicant?: string;
    applicationDateAdd: string;
    note: string;
    petName: animalInterface[];
}
