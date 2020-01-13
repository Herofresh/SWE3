const ORM = require("../config/orm.js");

dog = new ORM("dogs", {
  pet_name: "VARCHAR(30) NOT NULL",
  pet_age: "INTEGER(2)",
  pet_sex: "VARCHAR(6)",
  desexed: "BOOLEAN DEFAULT false"
});

module.exports = { dog };
