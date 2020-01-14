import { dbEntity } from "../config/orm";

@dbEntity("DogHeaven")
class Dog {
  constructor(name, alter) {
    this.name = name;
    this.age = alter;
    this.gay = { hallo: "Hi", hi: "Hallo" };
  }
}

export default Dog;
