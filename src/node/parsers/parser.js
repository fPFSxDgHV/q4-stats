import parser from 'fast-xml-parser'
import path from 'path'
import jetpack from 'fs-jetpack'
import getDuelData from "./duel"
import getTdmData from "./tdm"
import DB from "../../ui/db";

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

    if (parser.validate(xml)) {
      return parser.parse(xml, parseOptions)
    }
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
    const statsPath = await DB.getStatsPath()
    if (!statsPath) {
      console.log('stats path is empty')
      return
    }
    const data = await Parser.parseAllFiles(statsPath)
    const duels = data.filter(q => q?.type?.toLowerCase() === "duel")
    const tdms = data.filter(q => q?.type?.toLowerCase() === 'team dm')
    console.log(duels,tdms)
    Parser.findGuid(tdms)

    await DB.insertDuels(duels)
    await DB.insertTdms(tdms)
  }

  static findGuid(tdms) {
    const m = new Map()
    tdms.forEach(tdm => {
      tdm.players.forEach(player => {
        if (m.has(player.guid)) {
          m.set(player.guid, m.get(player.guid) + 1)
        } else {
          m.set(player.guid, 0)
        }
      })
    })

    let str = ''
    for(const [key, value] of m.entries()) {
      console.log(`${key} - ${value}`)
      str +=`${key} - ${value}\n`
    }
    console.log(str)
  }
}

export default Parser
