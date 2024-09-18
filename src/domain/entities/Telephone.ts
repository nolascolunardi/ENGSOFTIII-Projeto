import {Entity} from "./Entity";
import {TelephoneTypeEnum} from "../enums/TelephoneType.enum";

export class Telephone extends Entity {
    ddd: string;
    number: string;
    type: TelephoneTypeEnum;

    constructor(id: string, ddd: string, number: string, typeTelephone: TelephoneTypeEnum) {
        super(id);
        this.ddd = ddd;
        this.number = number;
        this.type = typeTelephone;
    }
}