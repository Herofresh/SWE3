const dbEntity = require("../config/orm.js");

@dbEntity()
class Dog {
  name;
  alter;
  constructor(name, alter) {
    this.name = name;
    this.alter = alter;
  }
}

module.exports = { Dog };
