export abstract class Entity {
    id: string;
    isActive: boolean;

    constructor(id: string) {
      this.id = id;
      this.isActive = true;
    }
}