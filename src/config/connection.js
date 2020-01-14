import { createConnection } from "mysql";
import { HOST, PORT, USER, PASSWORD, DB_NAME } from "./dbConfig";
class Connection {
  constructor() {
    this._db = this.setConnection();
    this.connectDB(this._db);
    this.createDB(this._db);
  }

  setConnection() {
    return createConnection({
      host: HOST,
      port: PORT,
      user: USER,
      password: PASSWORD,
      database: DB_NAME
    });
  }
  connectDB(db) {
    db.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("connected as id " + db.threadId);
    });
  }

  createDB(db) {
    db.query("CREATE DATABASE IF NOT EXISTS " + DB_NAME, function(err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  }

  get db() {
    return this._db;
  }
}

export const connection = new Connection();
