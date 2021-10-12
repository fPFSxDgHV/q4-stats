import {connection} from "./jsstore_con";

const settingsTable = {
  name: 'Settings',
  columns: {
    id: {primaryKey: true, autoIncrement: true},
    statsPath: {dataType: 'string'},
    language: {dataType: 'string', default: 'english', notNull: true},
    guid: {dataType: 'string'}
  }
}

const duelTable = {
  name: 'Duel',
  columns: {
    id: {primaryKey: true, autoIncrement: true},
    isTeamGame: {dataType: 'string'},
    matchId: {dataType: 'string'},
    map: {dataType: 'string', notNull: true},
    datetime: {dataType: 'string', notNull: true},
    server: {dataType: 'string'},
    players: [
      {
        name: {dataType: 'string'},
        clan: {dataType: 'string'},
        guid: {dataType: 'string'},
        score: {dataType: 'number'},
        kills: {dataType: 'number'},
        suicides: {dataType: 'number'},
        net: {dataType: 'number'},
        damageGiven: {dataType: 'number'},
        damageTaken: {dataType: 'number'},
        awards: [
          {
            name: {dataType: 'string'},
            value: {dataType: 'string'},
          }
        ],
        weapons: {
          Machinegun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          Shotgun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          HyperBlaster: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          GrenadeLauncher: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          RocketLauncher: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          Railgun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          LightningGun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
        }
      }],
  }
}

const tdmTable = {}


class DB {
  static async addDuel(duelData) {
    const numberOfRowsInserted = await connection.insert({
      into: 'Duel',
      values: [duelData]
    })
  }

  static async initSettings() {
    const settings = await connection.select({
      from: 'Settings'
    })

    if (settings.length === 0) {
      const numberOfRowsInserted = await connection.insert({
        into: 'Settings',
        values: [{
          statsPath: '',
          language: 'english',
          guid: ''
        }]
      })

    }
  }

  static async init() {
    const database = {
      name: 'app',
      tables: [settingsTable, duelTable]
    }

    const isDbCreated = await connection.initDb(database);
    // isDbCreated will be true when database will be initiated for first time

    if (isDbCreated) {
      console.log('Db Created & connection is opened');
    } else {
      console.log('Connection is opened');
    }

    await DB.initSettings()
  }

  static async getSettings() {
    const settings = await connection.select({
      from: 'Settings'
    })

    return settings?.[0]
  }

  static async updateStatsPath(newPath) {
    await connection.update({
      in: 'Settings',
      set: {
        statsPath: newPath
      }
    })
  }
}

export default DB