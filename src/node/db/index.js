const path = require('path')
const os = require('os')
const homedir = require('os')

const db = require('better-sqlite3')(DB.getDBFilePath(), {})

class DB {
  static getDBFilePath() {
    return path.join(os.homedir(), '.q4-stats', 'app.db')
  }

  static setupSettings() {
    const sql = `
    CREATE TABLE [IF NOT EXISTS] settings(
      settings_name STRING PRIMARY KEY,
      language STRING NOT NULL,
    );
    `
    db.prepare(sql)
  }
}

DB.setupSettings()