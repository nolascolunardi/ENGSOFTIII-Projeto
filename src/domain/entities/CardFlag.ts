import {Entity} from "./Entity";

export class CardFlag extends Entity {
    description: string;

    constructor(id: string, description: string) {
        super(id);
        this.description = description;
    }
}