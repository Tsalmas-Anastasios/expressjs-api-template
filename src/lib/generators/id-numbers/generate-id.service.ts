import { utilsService } from '../../utilities.service';
import { NumbersGenerator } from '../../../interfaces';


export class IdentifierGenerator implements NumbersGenerator {

    idGenerator(params: {
        prefix: string;
        alphabet: string;
        length: number;
    }): string {
        return `${ params.prefix }_${ utilsService.generateId({ alphabet: params.alphabet, length: params.length }) }`;
    }

}
