const path = require('path')
const os = require('os')
const homedir = require('os')

class DB {
  static getDBFilePath() {
    return path.join(os.homedir(), '.q4-stats', 'app.db')
  }

  static setupSettings() {
    const sql = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stats_path STRING,
      language STRING NOT NULL
    );`
    const stmt = db.prepare(sql)
    console.log(stmt)
  }
}

let db = null
if (!db) {
  db = require('better-sqlite3')(DB.getDBFilePath(), {})
} else {
  console.log('db connection already established')
}



DB.setupSettings()

module.exports = DB