const xml = `<?xml version="1.0"?><?xml-stylesheet type="text/xsl" href="../../../basics/style-078.xsl"?>
<match id="4036840014" isTeamGame="false" map="maps/mp/l4dm2_1.map" type="Duel" datetime="2021/09/21 15-30-02" server="108.61.112.181:28004">
\t<player name="sol" clan="" guid="OLC0gyMR9l8">
\t\t<stat name="Score" value="-1"/>
\t\t<stat name="Kills" value="0"/>
\t\t<stat name="Deaths" value="19"/>
\t\t<stat name="Suicides" value="1"/>
\t\t<stat name="Net" value="0"/>
\t\t<stat name="DamageGiven" value="829"/>
\t\t<stat name="DamageTaken" value="3288"/>
\t\t<awards>
\t\t\t<award name="Critical Failure"/>
\t\t</awards>
\t\t<weapons>
\t\t\t<weapon name="Machinegun" hits="41" shots="152" kills="0"/>
\t\t\t<weapon name="Shotgun" hits="14" shots="66" kills="0"/>
\t\t\t<weapon name="HyperBlaster" hits="15" shots="182" kills="0"/>
\t\t\t<weapon name="Grenade Launcher" hits="2" shots="19" kills="0"/>
\t\t\t<weapon name="Rocket Launcher" hits="10" shots="43" kills="0"/>
\t\t\t<weapon name="Railgun" hits="2" shots="9" kills="0"/>
\t\t\t<weapon name="Lightning Gun" hits="34" shots="196" kills="0"/>
\t\t</weapons>
\t</player>
\t<player name="^c001toby" clan="" guid="B71Uwlyz/NU">
\t\t<stat name="Score" value="17"/>
\t\t<stat name="Kills" value="18"/>
\t\t<stat name="Deaths" value="1"/>
\t\t<stat name="Suicides" value="1"/>
\t\t<stat name="Net" value="0"/>
\t\t<stat name="DamageGiven" value="3288"/>
\t\t<stat name="DamageTaken" value="829"/>
\t\t<awards>
\t\t\t<award name="impressive" value="9"/>
\t\t\t<award name="combo_kill" value="1"/>
\t\t</awards>
\t\t<weapons>
\t\t\t<weapon name="Grenade Launcher" hits="0" shots="9" kills="0"/>
\t\t\t<weapon name="Rocket Launcher" hits="28" shots="71" kills="6"/>
\t\t\t<weapon name="Railgun" hits="23" shots="34" kills="11"/>
\t\t\t<weapon name="Lightning Gun" hits="52" shots="140" kills="1"/>
\t\t</weapons>
\t</player>
</match>
`
require('util').inspect.defaultOptions.depth = null
const parser = require('fast-xml-parser')
const Parser = require("./parser");

function getStat(statArray, stat) {
  return statArray?.find(q => q?.name?.toLowerCase() === stat?.toLowerCase())?.value
}

function getAwards(awards) {
  if (Array.isArray(awards)) {
    return awards
  } else {
    return [awards]
  }
}

function mapWeaponName(name) {
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

function getWeapons(weapons) {
  const updatedWeaponsObj = weapons.map(q => ({
    [mapWeaponName(q.name)]: {
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

function getPlayers(players) {
  return players.map(player => ({
    name: player?.name,
    clan: player?.clan,
    guid: player?.guid,
    score: getStat(player?.stat, 'score'),
    kills: getStat(player?.stat, 'kills'),
    suicides: getStat(player?.stat, 'suicides'),
    net: getStat(player?.stat, 'net'),
    damageGiven: getStat(player?.stat, 'damagegiven'),
    damageTaken: getStat(player?.stat, 'damagetaken'),
    awards: getAwards(player?.awards?.award),
    weapons: getWeapons(player?.weapons?.weapon)
  }))
}

function mapData(data) {
  const match = data?.match
  if (!match) {
    return null
  }
  return {
    isTeamGame: match?.isTeamGame,
    matchId: match?.id,
    map: match?.map,
    datetime: match?.datetime,
    server: match?.server,
    players: getPlayers(match?.player)

  }
}

function parseDuel(xml) {
  const rawData = Parser.parseXML(xml)
  const data = mapData(rawData)
  console.log(data)

  return data
}

function getDuelData(rawData) {
  return mapData(rawData)
}

module.exports = getDuelData