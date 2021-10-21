class DamageHelper {
  static getHitsOverShots(_hits, _shots) {
    const hits = _hits ? _hits : 0
    const shots = _shots ? _shots : 0

    return `${hits}/${shots}`
  }

  static isNumber(value) {
    return typeof value === 'number' && isFinite(value);
  }

  static calcMGdmg(hits) {
    if (!hits || !DamageHelper.isNumber(hits)) {
      return 0
    }
    return Number(hits * 5)
  }

  static calcLGdmg(hits) {
    if (!hits || !DamageHelper.isNumber(hits)) {
      return 0
    }
    return Number(hits * 7)
  }

  static calcRailDmg(hits) {
    if (!hits || !DamageHelper.isNumber(hits)) {
      return 0
    }

    return Number(hits * 90)
  }

  static calcRocketDmg(playerWeapons) {
    let dmg = Number(playerWeapons.dmg)
    for (const [gunName, gunData] of Object.entries(playerWeapons)) {
      if (gunName === 'dmg') {
        continue
      }
      const hits = Number(gunData.hits)

      if (gunName === 'Machinegun') {
        dmg-= DamageHelper.calcMGdmg(hits)
      }
      if (gunName === 'LightningGun') {
        dmg-=  DamageHelper.calcLGdmg(hits)
      }
      if (gunName === 'Railgun') {
        dmg-= DamageHelper.calcRailDmg(hits)
      }

      console.log(gunName, gunData)
    }

    return dmg
  }
}

export default DamageHelper