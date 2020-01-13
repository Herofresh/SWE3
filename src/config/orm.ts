// const connection = require("./connection.js");

// export class ORM {
//   constructor(table, cols) {
//     this.table = table;
//     this.cols = cols;
//   }

//   async request(statement, params) {
//     return connection.db.query(statement, params, function(err, data) {
//       if (err) reject(err);
//       resolve(data);
//     });
//   }

//   async all() {
//     const sql = `SELECT * FROM ??`;
//     this.request(sql, this.table);
//   }

//   async create(cols, vals) {
//     let sql = `INSERT INTO ?? (??) VALUES (?)`;
//     let inserts =
//       cols == true ? [this.table, cols, vals] : [this.table, this.cols, vals];
//     sql = connection.format(sql, inserts);

//     this.request(sql, {});
//   }

//   async update(col, value, id) {
//     const sql = `UPDATE ?? SET ? = ? WHERE id = ?`;

//     this.request(sql, [this.table, col, value, id]);
//   }

//   async destroy(id) {
//     const sql = `DELETE FROM ?? WHERE id = ?`;

//     this.request(sql, [this.table, id]);
//   }

//   async sync() {
//     const columns = cols => Object.keys(cols).map(key => `${key} ${cols[key]}`);

//     const createTableSQL = `
//     CREATE TABLE ${this.table} (
//       id INT AUTO_INCREMENT NOT NULL,
//       ${columns(this.cols).join(",")},
//       PRIMARY KEY (id)
//     )`;

//     this.request(createTableSQL, {});
//   }

//   getColNames() {
//     return Object.keys(this.cols);
//   }
// }

export function dbEntity(tableName) {
  return function decorator(target) {
    let cols = {};
    for (const propName in Reflect.ownKeys(target)) {
      cols[propName] = "VARCHAR(45)";
    }
    // target.prototype.ORM = new ORM(
    //   tableName ? tableName : "tbl_" + target.name,
    //   cols
    // );
    // target.prototype.ORM.sync();
    console.log("Hi from", tableName);
    console.log(Reflect.ownKeys(target));
    return (...args) => {
      return new target(...args);
    };
  };
}
