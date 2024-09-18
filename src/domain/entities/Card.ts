import {CardFlag} from "./CardFlag";
import {Entity} from "./Entity";

export class Card extends Entity {
    number: string;
    ownerName: string;
    cvv: string;
    isPreferred: boolean;
    flag: CardFlag;

    constructor(id: string, number: string, ownerName: string, cvv: string, isPreferred:boolean, cardFlag: CardFlag) {
      super(id);
      this.number = number;
      this.ownerName = ownerName;
      this.cvv = cvv;
      this.isPreferred = isPreferred;
      this.flag = cardFlag;
    }
}