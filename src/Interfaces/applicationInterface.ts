import animalInterface from './animalInterface';
import opinionInterface from './opinionInterface';

export default interface applicationInterface {
    id?: number;
    dateStart: string;
    dateEnd: string;
    offerId: number;
    applicant?: string;
    applicationDateAdd: string;
    note: string;
    animals: animalInterface[];
    opinions?: opinionInterface[];
}
