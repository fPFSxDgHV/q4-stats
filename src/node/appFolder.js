const jetpack = require('fs-jetpack')
const path = require('path')

const homedir = require('os').homedir()
const appDir = path.join(homedir, '.q4-stats')

async function createIfNotExistAppFolder() {
  await jetpack.dir(appDir)
}

async function createIfNotExistAppDB() {
  const dbPath = path.join(appDir, 'app.db')
  await jetpack.file(dbPath)
}

async function initAppFolder() {
  try {
    await createIfNotExistAppFolder()
    await createIfNotExistAppDB()
  } catch (e) {
    console.error('failed to create app folder', e)
  }
}

module.exports = initAppFolder
