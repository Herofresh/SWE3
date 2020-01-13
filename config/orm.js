const connection = require("./connection.js");

class ORM {
  constructor(table) {
    this.table = table;
    this.cols = cols;
  }

  async all() {
    const sql = `SELECT * FROM ??`;

    connection.query(sql, this.table, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  }

  async create(cols, vals) {
    let sql = `INSERT INTO ?? (??) VALUES (?)`;
    let inserts =
      cols == true ? [this.table, cols, vals] : [this.table, this.cols, vals];
    sql = connection.format(sql, inserts);

    connection.query(sql, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  }

  async update(col, value, id) {
    const sql = `UPDATE ?? SET ? = ? WHERE id = ?`;

    connection.query(sql, [this.table, col, value, id], function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  }

  async destroy(id) {
    const sql = `DELETE FROM ?? WHERE id = ?`;

    connection.query(sql, [this.table, id], function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  }

  async sync() {
    const columns = cols => Object.keys(cols).map(key => `${key} ${cols[key]}`);

    const createTableSQL = `
    CREATE TABLE ${this.table} (
      id INT AUTO_INCREMENT NOT NULL,
      ${columns(this.cols).join(",")},
      PRIMARY KEY (id)
    )`;

    return connection.query(createTableSQL, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  }

  static getColNames() {
    return Object.keys(cols);
  }
}

module.exports = ORM;
