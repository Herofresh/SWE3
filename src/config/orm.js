import { connection } from "./connection.js";

export class ORM {
  constructor(tableName, classRef) {
    this.tableName = tableName;
    this.classRef = classRef;
    this.columDef = {};
  }

  all() {
    const sql = `SELECT * FROM ??`;

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, this.tableName, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  create(cols, vals) {
    let sql = `INSERT INTO ?? (??) VALUES (?)`;
    let inserts =
      cols == true
        ? [this.tableName, cols, vals]
        : this.columDef
        ? [this.tableName, this.columDef, vals]
        : null;
    if (inserts === null) {
      console.log("Error with colum definition");
      return;
    }
    sql = connection.format(sql, inserts);

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async update(col, value, id) {
    const sql = `UPDATE ?? SET ? = ? WHERE id = ?`;

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, [table, col, value, id], function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async destroy(id) {
    const sql = `DELETE FROM ?? WHERE id = ?`;

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, [this.tableName, id], function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async sync() {
    const columns = cols => Object.keys(cols).map(key => `${key} ${cols[key]}`);

    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id INT AUTO_INCREMENT NOT NULL,
      ${columns(this.columDef).join(",")},
      PRIMARY KEY (id)
    )`;

    return new Promise(function(resolve, reject) {
      connection.db.query(createTableSQL, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  getColNames() {
    return Object.keys(this.columDef);
  }

  addColumDef(colName, columDef) {
    this.columDef[colName] = columDef;
  }

  addColumDef(fullTableDefinition) {
    this.columDef = fullTableDefinition;
  }
}

export function dbEntity(tableName) {
  return function decorator(target) {
    target.ORM = new ORM(tableName ? tableName : "tbl_" + target.name, target);
  };
}
