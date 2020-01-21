import { connection } from "./connection.js";

export class ORM {
  constructor(tableName, classRef) {
    this.tableName = tableName;
    this.classRef = classRef;
    this.columDef = {};
    this.relationships = [];
    this.relationSet = false;
    this.serializer = new Serializer([]);
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

  select(colum, value) {
    let sql = `SELECT * FROM ?? WHERE ? = ?`;
    sql = connection.db.format(sql, [this.tableName, colum, value]);

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
    return returnValue;
  }

  async selectObjects(colum, value) {
    let returnValue = [];
    const values = await this.select(colum, value);
    for (let key in values) {
      returnValue.push(new this.classRef(values[key]));
    }
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
    let sql = `UPDATE ?? SET ? = ? WHERE id = ?`;
    sql = connection.db.format(sql, [this.tableName, col, value, id]);
    return new Promise(function(resolve, reject) {
      connection.db.query(sql, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async destroy(id) {
    let sql = `DELETE FROM ?? WHERE id = ?`;
    sql = connection.db.format(sql, [this.tableName, id]);

    return new Promise(function(resolve, reject) {
      connection.db.query(sql, function(err, data) {
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

  addOneToNRelationDefinition(classRef) {
    if (!this.relationSet) {
      this.createMetaDataTable();
      this.relationSet = true;
    }
    this.serializer.addType(classRef);
  }

  addRelation(object) {}

  createMetaDataTable() {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${this.tableName}_meta (
      id INT AUTO_INCREMENT NOT NULL,
      typeref JSON NOT NULL,
      tablename VARCHAR(30) NOT NULL,
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

  syncColumDef(objectInstance) {
    if (objectInstance instanceof this.classRef) {
      this.columDef = this.getColumGeneration(objectInstance);
    } else {
      console.log("Object does not match the used class!");
      return;
    }
  }

  getColumGeneration(objectInstance) {
    let returnValue = {};
    for (let key in objectInstance) {
      switch (typeof objectInstance[key]) {
        case "string":
          returnValue[key] = "VARCHAR(30) NULL";
          break;
        case "boolean":
          returnValue[key] = "TINYINT NULL";
          break;
        case "number":
          returnValue[key] = "DECIMAL NULL";
          break;
        case "symbol":
          returnValue[key] = "VARCHAR(1) NULL";
          break;
        case "object":
          returnValue[key] = "JSON NULL";
          break;
        default:
          break;
      }
    }
    return returnValue;
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }
  addType(type) {
    this.types.push(type);
  }
  serialize(object) {
    let idx = this.types.findIndex(e => {
      return e.name == object.constructor.name;
    });
    if (idx == -1)
      throw "type  '" + object.constructor.name + "' not initialized";
    return JSON.stringify([idx, Object.entries(object)]);
  }
  deserialize(jstring) {
    let array = JSON.parse(jstring);
    let object = new this.types[array[0]]();
    array[1].map(e => {
      object[e[0]] = e[1];
    });
    return object;
  }
}

export function dbEntity(tableName) {
  return function decorator(target) {
    target.ORM = new ORM(tableName ? tableName : "tbl_" + target.name, target);
  };
}
