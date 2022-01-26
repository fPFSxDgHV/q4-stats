import parser, { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser'
import path from 'path'
import jetpack from 'fs-jetpack'
import getDuelData from "./duel"
import getTdmData from "./tdm"
import DB from "../../ui/db";
import {MatchHelper} from "../../ui/data";
import {MatchStats} from "./Stats";

class Parser {
  static parseXML(xml) {
    const parseOptions = {
      attributeNamePrefix: "",
      attrNodeName: false, //default is 'false'
      textNodeName: "#text",
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: false,
      parseAttributeValue: true,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      numParseOptions: {
        hex: true,
        leadingZeros: true,
        //skipLike: /\+[0-9]{10}/
      },
      arrayMode: false, //"strict"
      stopNodes: ["parse-me-as-string"]
    }
    const parser = new XMLParser(parseOptions)
    return parser.parse(xml)
  }

  static async getListOfXMLFilesFromDir(dir) {
    const filesToReturn = []
    async function walkDir(currentPath) {
      const files = await jetpack.listAsync(currentPath);
      for (const i in files) {
        const curFile = path.join(currentPath, files[i]);
        if (await (await jetpack.inspect(curFile)).type === 'file') {
          filesToReturn.push(curFile);
        } else if (await (await jetpack.inspect(curFile)).type === 'dir') {
          await walkDir(curFile);
        }
      }
    }
    await walkDir(dir)
    return filesToReturn
  }

  static async parseFile(filePath) {
    const xml = await jetpack.readAsync(filePath)
    const rawData = Parser.parseXML(xml)
    if (rawData?.match?.type?.toLowerCase() === 'duel') {
      return getDuelData(rawData)
    } else if (rawData?.match?.type?.toLowerCase() === 'team dm') {
      return getTdmData(rawData)
    }
  }

  static async parseAllFiles(statsPath) {
    const fileList = await Parser.getListOfXMLFilesFromDir(statsPath)

    return await Promise.all(fileList.map(Parser.parseFile))
  }

  static getPlayers(players) {
    return players.map(player => ({
      name: player?.name,
      clan: player?.clan,
      guid: player?.guid,
      score: Parser.getStat(player?.stat, 'score'),
      kills: Parser.getStat(player?.stat, 'kills'),
      suicides: Parser.getStat(player?.stat, 'suicides'),
      net: Parser.getStat(player?.stat, 'net'),
      damageGiven: Parser.getStat(player?.stat, 'damagegiven'),
      damageTaken: Parser.getStat(player?.stat, 'damagetaken'),
      awards: Parser.getAwards(player?.awards?.award),
      weapons: Parser.getWeapons(player?.weapons?.weapon)
    }))
  }

  static getStat(statArray, stat) {
    return statArray?.find(q => q?.name?.toLowerCase() === stat?.toLowerCase())?.value
  }

  static getAwards(awards) {
    if (Array.isArray(awards)) {
      return awards
    } else {
      return [awards]
    }
  }

  static getWeapons(weapons) {
    const updatedWeaponsObj = weapons.map(q => ({
      [Parser.mapWeaponName(q.name)]: {
        hits: q?.hits,
        shots: q?.shots,
        kills: q?.kills,
      }
    }))
    const result = {}
    updatedWeaponsObj.forEach(q => {
      const gunName = Object.keys(q)?.[0]
      result[gunName] = q[gunName]
    })
    return result
  }

  static mapWeaponName(name) {
    const names = {
      Machinegun: 'Machinegun',
      Shotgun: 'Shotgun',
      HyperBlaster: 'HyperBlaster',
      'Grenade Launcher': 'GrenadeLauncher',
      'Rocket Launcher': 'RocketLauncher',
      Railgun: 'Railgun',
      'Lightning Gun': 'LightningGun'
    }

    for (const nameInNames of Object.keys(names)) {
      if (name === nameInNames) {
        return names[nameInNames]
      }
    }
  }

  static async getAndUpdateMatchData() {
    try {
      const statsPath = await DB.getStatsPath()
      if (!statsPath) {
        console.log('stats path is not provided')
        return
      }
      const data = await Parser.parseAllFiles(statsPath)
      const duels = data.filter(q => q?.type?.toLowerCase() === "duel")
      const tdms = data.filter(q => q?.type?.toLowerCase() === 'team dm')

      const guid = Parser.findGuid(duels)
      await DB.updateGuid(guid)
      await MatchStats.processData(duels, tdms, guid)
      const stats = Parser.getOverallStats(duels, tdms, guid)
      await DB.addOverallStats(stats)

      await DB.insertDuels(duels)
      await DB.insertTdms(tdms)
    } catch (e) {
      console.error('e1', e)
    }


  }

  static findGuid(duels) {
    const m = new Map()
    duels.forEach(duel => {
      duel.players.forEach(player => {
        if (m.has(player.guid)) {
          m.set(player.guid, m.get(player.guid) + 1)
        } else {
          m.set(player.guid, 0)
        }
      })
    })
    const printGuids = () => {
      let str = ''
      for(const [key, value] of m.entries()) {
        console.log(`${key} - ${value}`)
        str +=`${key} - ${value}\n`
      }
      console.log(str)
    }
    let result = ''
    let score = 0
    for (const [key, value] of m) {
      if (value > score) {
        score = value
        result = key
      }
    }
    return result
  }

  static getOverallStats(duels, tdms, guid) {
    const duelStats = {
      played: 0,
      wins: 0,
      loses: 0,
    }

    const tdmStats = {
      played: 0,
      wins: 0,
      loses: 0,
    }

    duels.forEach(duel => {
      const isWin = MatchHelper.wasDuelWon(duel, guid)

      duelStats.played++
      if (isWin) {
        duelStats.wins++
      } else {
        duelStats.loses++
      }
    })
    tdms.forEach(tdm => {
      const isWin = MatchHelper.wasTdmWon(tdm, guid)
      if (isWin === null) {
        return
      }
      tdmStats.played++
      if (isWin) {
        tdmStats.wins++
      } else {
        tdmStats.loses++
      }
    })

    return {
      duels: duelStats,
      tdms: tdmStats
    }
  }
}

export default Parser
