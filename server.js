const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "vet_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

function all() {
  const sql = "SELECT * FROM cats";

  return new Promise(function(resolve, reject) {
    connection.query(sql, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

let allTheCats = all()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

console.log(`All the cats are ${allTheCats}!`);
