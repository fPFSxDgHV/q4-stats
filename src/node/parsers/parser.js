require('util').inspect.defaultOptions.depth = null
const parser = require('fast-xml-parser')


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
      return parser.parse(xml, options)
    }
  }
}

module.exports = Parser