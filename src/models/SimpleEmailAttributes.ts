import { EmailDetails } from './EmailDetails';

export class SimpleEmailAttributes {

    email?: EmailDetails;

    to?: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    text?: string;
    html: string;


    constructor(props?: SimpleEmailAttributes) {

        this.email = props?.email || null;

        this.to = props?.to || [];
        this.cc = props?.cc || [];
        this.bcc = props?.bcc || [];
        this.subject = props?.subject || null;
        this.text = props?.text || null;
        this.html = props?.html || null;

    }

}
