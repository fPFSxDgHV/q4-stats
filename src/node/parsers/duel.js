const xml = `<?xml version="1.0"?><?xml-stylesheet type="text/xsl" href="../../../basics/style-078.xsl"?>
<match id="2097134744" isTeamGame="false" map="maps/mp/l4dm2_1.map" type="Duel" datetime="2021/09/30 02-35-27" server="173.199.76.108:28004">
\t<player name="sol" clan="" guid="OLC0gyMR9l8">
\t\t<stat name="Score" value="9"/>
\t\t<stat name="Kills" value="10"/>
\t\t<stat name="Deaths" value="22"/>
\t\t<stat name="Suicides" value="1"/>
\t\t<stat name="Net" value="0"/>
\t\t<stat name="DamageGiven" value="1821"/>
\t\t<stat name="DamageTaken" value="3751"/>
\t\t<awards>
\t\t</awards>
\t\t<weapons>
\t\t\t<weapon name="Machinegun" hits="36" shots="123" kills="1"/>
\t\t\t<weapon name="Shotgun" hits="3" shots="22" kills="0"/>
\t\t\t<weapon name="HyperBlaster" hits="16" shots="91" kills="0"/>
\t\t\t<weapon name="Grenade Launcher" hits="0" shots="5" kills="0"/>
\t\t\t<weapon name="Rocket Launcher" hits="26" shots="99" kills="4"/>
\t\t\t<weapon name="Railgun" hits="0" shots="1" kills="0"/>
\t\t\t<weapon name="Lightning Gun" hits="150" shots="580" kills="5"/>
\t\t</weapons>
\t</player>
\t<player name="Tai" clan="" guid="f9uaA8nM8Xg">
\t\t<stat name="Score" value="21"/>
\t\t<stat name="Kills" value="21"/>
\t\t<stat name="Deaths" value="10"/>
\t\t<stat name="Suicides" value="0"/>
\t\t<stat name="Net" value="0"/>
\t\t<stat name="DamageGiven" value="3751"/>
\t\t<stat name="DamageTaken" value="1821"/>
\t\t<awards>
\t\t\t<award name="impressive" value="2"/>
\t\t</awards>
\t\t<weapons>
\t\t\t<weapon name="Machinegun" hits="4" shots="9" kills="0"/>
\t\t\t<weapon name="HyperBlaster" hits="2" shots="29" kills="0"/>
\t\t\t<weapon name="Grenade Launcher" hits="2" shots="3" kills="1"/>
\t\t\t<weapon name="Rocket Launcher" hits="29" shots="53" kills="10"/>
\t\t\t<weapon name="Railgun" hits="6" shots="10" kills="2"/>
\t\t\t<weapon name="Lightning Gun" hits="328" shots="1035" kills="8"/>
\t\t</weapons>
\t</player>
</match>
`
require('util').inspect.defaultOptions.depth = null
const parser = require('fast-xml-parser')
const options = {
  attributeNamePrefix : "",
  attrNodeName: false, //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : false,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : false,
  parseAttributeValue : true,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  numParseOptions:{
    hex: true,
    leadingZeros: true,
    //skipLike: /\+[0-9]{10}/
  },
  arrayMode: false, //"strict"
  stopNodes: ["parse-me-as-string"]
};

console.log(parser.validate(xml))

if (parser.validate(xml)) {
  const obj = parser.parse(xml, options)
  console.log(obj)
  const json = parser.convertToJson(obj)
  console.log('json',json)
}