const DBInterface = require("../core/DBInterface.js");
const mysql = require("mysql");

/**
 * @class
 * @classdesc A database provider compatible with MySQL
 * @augments {DBInterface}
 */
class MySQLDB extends DBInterface { // TODO: remove mysql dependency from core package
  pool = null;

  appTable = null;
  tables = {};

  static creationQueries = {
    appTable: `CREATE TABLE apps (
      id varchar(100) NOT NULL,
      secret varchar(250) NOT NULL,
      name varchar(60) NOT NULL,
      description mediumtext NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  }
  constructor(connectionData, { appTable }) {
    super();
    this.pool = mysql.createPool({
      connectionLimit: 10,
      ...connectionData
    });

    this.appTable = {
      name: appTable,
      id: "appTable"
    };
    this.tables[appTable] = this.appTable;
    this.database = connectionData.database;

    this.init();
  }

  init() {
    const pool = this.pool;
    pool.query(`SELECT * FROM information_schema.tables WHERE table_schema = '${this.database}'`, (err, res, _fields) => {
      if (err) throw err;
      res.forEach(table => {
        if (!this.tables[table.TABLE_NAME]) return;

        this.tables[table.TABLE_NAME].ready = true;
      });

      for (const t in this.tables) {
        if (this.tables[t].ready) continue;

        pool.query(MySQLDB.creationQueries[this.tables[t].id], (err) => {
          if (err) throw err;
          console.log("created table '" + t + "'");
        });
      }
    });
  }

  /** @inheritdoc */
  fetchAppInfo(clientId) {
    return new Promise((res, rej) => {
      this.pool.query(`SELECT name, id, description FROM ${this.appTable.name} WHERE id='${clientId}'`, (err, results) => {
        if (err) return rej(err);
        if (results.length === 0) return res(null);

        const result = results[0];
        res({
          name: result.name,
          id: result.id,
          description: result.description
        });
      });
    });
  }

  /** @inheritdoc */
  createApp(id, name, description) {
    return new Promise(async (res, rej) => {
      const secret = this.hashProvider.token();
      const hash = await this.hashProvider.hash(secret);

      this.pool.query(`INSERT INTO apps (name, id, description, secret) VALUES ('${name}', '${id}', '${description}', '${hash}')`, (err) => {
        if (err) return rej(err);
        res(secret);
      });
    });
  }
}

module.exports = MySQLDB;
