const express = require('express');
const path = require('path')
const cors = require('cors')


function initServer() {
  try {
    const dirToWatch = path.join(__dirname, 'static')
    console.log(dirToWatch)

    const app = express();
    app.use(cors())
    app.use(express.static(dirToWatch));

    app.listen(6007);
  } catch (e) {
    console.error('failed to start static server',e)
  }
}

module.exports = initServer