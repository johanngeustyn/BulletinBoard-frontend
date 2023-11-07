export class User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    department: string;
    password: string;

    constructor() {
        this._id = '';
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.role = '';
        this.department = '';
        this.password = '';
    }
}