import { dbEntity } from "../config/orm";

@dbEntity("DogHeaven")
class Dog {
  constructor(name, alter) {
    this.name = name;
    this.alter = alter;
  }
}

export default Dog;
