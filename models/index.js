const ORM = require("../config/orm.js");

class db {
  dog = new ORM("dogs", {
    pet_name: "VARCHAR(30) NOT NULL",
    pet_age: "INTEGER(2)",
    pet_sex: "VARCHAR(6)",
    desexed: "BOOLEAN DEFAULT false"
  });

  owner = new ORM("owner", {
    first_name: "VARCHAR(30) NOT NULL",
    last_name: "VARCHAR(30) NOT NULL"
  });
}

module.exports = { db };
