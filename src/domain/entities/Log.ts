import {User} from "./User";
import {Entity} from "./Entity";

export class Log extends Entity {
    hourDate: Date;
    message: string;
    user: User;

    constructor(id: string, hourDate: Date, message: string, user: User) {
      super(id);
      this.hourDate = hourDate;
      this.message = message;
      this.user = user;
    }
}