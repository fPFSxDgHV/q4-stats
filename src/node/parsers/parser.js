require('util').inspect.defaultOptions.depth = null
const parser = require('fast-xml-parser')


const fs = require('fs');
const path = require('path');
const jetpack = require('fs-jetpack')
const getDuelData = require("./duel");

// Return a list of files of the specified fileTypes in the provided dir,
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
async function getFilesFromDir(dir, fileTypes) {
  const filesToReturn = [];
  async function walkDir(currentPath) {
    const files = await jetpack.listAsync(currentPath);
    for (const i in files) {
      const curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile()) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
}


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
    }
  }

  static async parseAllFiles(statsPath) {
    const fileList = await Parser.getListOfXMLFilesFromDir(statsPath)

    return await Promise.all(fileList.map(Parser.parseFile))
  }
}

module.exports = Parser