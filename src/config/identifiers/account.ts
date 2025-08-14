export class AccountIdentifiersConfig {

    public id: {
        prefix: string;
        alphabet: string;
        length: number;
    }


    constructor() {

        this.id = {
            prefix: 'acc',
            alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^*~-_=',
            length: 36,
        }

    }

}
