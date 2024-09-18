import {Entity} from "./Entity";

export class Country extends Entity {
    name: string;
    initials: string;

    constructor(id: string, name: string, initials: string) {
        super(id);
        this.name = name;
        this.initials = initials;
    }
}