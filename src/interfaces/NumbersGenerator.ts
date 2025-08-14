export interface NumbersGenerator {

    idGenerator(params: {
        prefix: string;
        alphabet: string;
        length: number;
    }): string;

}
