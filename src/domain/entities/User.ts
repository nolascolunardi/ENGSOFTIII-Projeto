import {Entity} from "./Entity";

export class User extends Entity  {
    email: string;
    password: string;

    constructor(id: string, email: string, password: string) {
        super(id);
        this.email = email;
        this.password = password;
    }
}