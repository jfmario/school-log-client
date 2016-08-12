/**
 * Represents an entry object from the server.
 */

export class Entry {

    child: String;
    children: String[];
    date: Date;
    description: String;
    hours: Number;
    subject: String;
    user: String;

    constructor ()
    {
        this.hours = 0.5;
    }
};
