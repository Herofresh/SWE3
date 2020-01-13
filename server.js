const cat = require("./models/cat.js");

create("Keyboard", 7, "female", false)
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

update(true, 1)
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

let allTheCats = all()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

console.log(`All the cats are ${allTheCats}!`);
