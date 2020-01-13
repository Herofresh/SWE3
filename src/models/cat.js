import { dbEntity } from "../config/orm";

@dbEntity("CatHeaven")
class Cat {
  constructor(name, alter, muster) {
    this.name = name;
    this.alter = alter;
    this.muster = muster;
  }
}

export default Cat;
