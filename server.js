const db = require("./models/index.js");

db.dog.create(
  ["pet_name", "pet_age", "pet_sex", "desext"],
  ["Karl", "2", "male", "false"]
);

let allDogs = dog
  .all()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

console.log(`All the cats are ${allDogs}!`);
