const mysql = require("mysql");
import { HOST, PORT, USER, PASSWORD, DB_NAME } from "./dbConfig";
class Connection {
  constructor() {
    this._db = mysql.createConnection({
      host: HOST,
      port: PORT,
      user: USER,
      password: PASSWORD
    });

    this._db.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("connected as id " + connection.threadId);
      this._db.query("CREATE DATABASE IF NOT EXISTS " + DB_NAME, function(
        err,
        result
      ) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    });
  }

  get db() {
    return this._db;
  }
}

module.exports = new Connection();
