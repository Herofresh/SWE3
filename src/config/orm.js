import { connection } from "./connection.js";

export class ORM {
  constructor(tableName, classRef) {
    this.tableName = tableName;
    this.classRef = classRef;
    this.columDef = {};
  }

  all() {
    let sql = `SELECT * FROM ??`;
    sql = connection.db.format(sql, this.tableName);

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async allObjects() {
    let returnValue = [];
    const values = await this.all();
    for (let key in values) {
      returnValue.push(new this.classRef(values[key]));
    }
    console.log(returnValue);
    return returnValue;
  }

  create(columNames, objectToCreate) {
    if (objectToCreate instanceof this.classRef) {
      let values = [];
      for (let key in objectToCreate) {
        if (typeof objectToCreate[key] === "object") {
          values.push(JSON.stringify(objectToCreate[key]));
        } else {
          values.push(objectToCreate[key]);
        }
      }

      console.log("VALUES:", values);
      let sql = `INSERT INTO ?? (??) VALUES (?)`;
      let inserts =
        columNames == true
          ? [this.tableName, columNames, values]
          : this.columDef
          ? [this.tableName, this.getColNames(), values]
          : null;
      if (inserts === null) {
        console.log("Error with colum definition");
        return;
      }
      sql = connection.db.format(sql, inserts);

      return new Promise(function(resolve, reject) {
        connection.db.query(sql, function(err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    } else {
      console.log(
        "ObjectTypeError: Object is not the same class as ORM Reference"
      );
      return;
    }
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
    if (this.columDef === {}) {
      console.log("First use the addColumDef function to define the Table!");
      return;
    }
    const columns = cols => Object.keys(cols).map(key => `${key} ${cols[key]}`);

    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id INT AUTO_INCREMENT NOT NULL,
      ${columns(this.columDef).join(",")},
      PRIMARY KEY (id)
    )`;

    console.log(createTableSQL);

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

  addFullColumDef(fullTableDefinition) {
    this.columDef = fullTableDefinition;
  }

  syncColumDef(objectInstance) {
    if (objectInstance instanceof this.classRef) {
      this.columDef = {};
      for (let key in objectInstance) {
        switch (typeof objectInstance[key]) {
          case "string":
            this.columDef[key] = "VARCHAR(30) NULL";
            break;
          case "boolean":
            this.columDef[key] = "TINYINT NULL";
            break;
          case "number":
            this.columDef[key] = "DECIMAL NULL";
            break;
          case "symbol":
            this.columDef[key] = "VARCHAR(1) NULL";
            break;
          case "object":
            this.columDef[key] = "JSON NULL";
            break;
          default:
            break;
        }
      }
    } else {
      console.log("Object does not match the used class!");
      return;
    }
  }
}

export function dbEntity(tableName) {
  return function decorator(target) {
    target.ORM = new ORM(tableName ? tableName : "tbl_" + target.name, target);
  };
}
