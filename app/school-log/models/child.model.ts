/**
 * Represents a child in the application.
 */
export class Child {

    _id: String;
    /* age: Number;
    grade: Number;
    name: String; */
    user: String;

    constructor (
        public name: String,
        public age: Number,
        public grade: Number
    ) {}
};
