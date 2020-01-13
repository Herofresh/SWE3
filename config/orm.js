const connection = require("./connection.js");

const ORM = function(table) {
  this.table = table;

  (this.all = function() {
    const sql = `SELECT * FROM ??`;

    return new Promise(function(resolve, reject) {
      connection.query(sql, table, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }),
    (this.create = function(name, age, sex, fixed) {
      const sql = `INSERT INTO ?? (pet_name, pet_age, pet_sex, desexed) VALUES (?, ?, ?, ?)`;

      return new Promise(function(resolve, reject) {
        connection.query(sql, [table, name, age, sex, fixed], function(
          err,
          data
        ) {
          if (err) reject(err);
          resolve(data);
        });
      });
    }),
    (this.update = function(desexed, id) {
      const sql = `UPDATE ?? SET desexed = ? WHERE id = ?`;

      return new Promise(function(resolve, reject) {
        connection.query(sql, [table, desexed, id], function(err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    }),
    (this.destroy = function(id) {
      const sql = `DELETE FROM ?? WHERE id = ?`;

      return new Promise(function(resolve, reject) {
        connection.query(sql, [table, id], function(err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    });
};

module.exports = ORM;
