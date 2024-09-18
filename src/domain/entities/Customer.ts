import {User} from "./User";
import {Card} from "./Card";
import {Telephone} from "./Telephone";
import {GenderEnum} from "../enums/Gender.enum";
import {Adress} from "./Adress";

export class Customer extends User {
    name: string;
    birthDate: Date;
    cpf: string;
    cards: Card[];
    adress: Adress[];
    telephone: Telephone[];
    ranking: number;
    gender: GenderEnum;


    constructor(id: string, name: string, cpf: string, email:string, password: string , birthDate: Date, telephone: Telephone[], cards: Card[], adress: Adress[], ranking: number, gender: GenderEnum) {
      super(id, email, password);
      this.name = name;
      this.cpf = cpf;
      this.birthDate = birthDate;
      this.cards = cards;
      this.telephone = telephone;
      this.adress = adress;
      this.ranking = ranking;
      this.gender = gender;
    }
}