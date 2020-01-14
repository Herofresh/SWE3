import { dbEntity } from "../config/orm";

@dbEntity("DogHeaven")
class Dog {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

export default Dog;
