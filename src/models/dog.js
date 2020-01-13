import { dbEntity, BaseEntity } from "../config/orm";

@dbEntity('DogHeaven')
class Dog extends BaseEntity {
  constructor(name, alter) {
    super(name, alter);
    this.name = name;
    this.alter = alter;
  }
}

export default Dog;