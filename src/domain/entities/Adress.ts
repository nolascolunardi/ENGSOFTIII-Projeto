import {Entity} from "./Entity";
import {Country} from "./Country";
import {AddressType} from "../enums/AdressType.enum";

export class Adress extends Entity {
    cep: string;
    number: string;
    complement: string;
    street: string;
    streetType: string;
    neighborhood: string;
    note?: string;
    city: string;
    state: string;
    country: Country;
    type: AddressType;

    constructor(id: string, cep: string, number: string, complement: string, street:string, streetType: string, neighborhood: string, city: string, state: string, country: Country, type: AddressType, note?: string) {
        super(id);
        this.cep = cep;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.street = street;
        this.streetType = streetType;
        this.note = note;
        this.city = city;
        this.state = state;
        this.country = country;
        this.type = type;
    }
}