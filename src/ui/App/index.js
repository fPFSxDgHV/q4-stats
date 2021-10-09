import React from 'react'
import { render } from 'react-dom'

const App = () => <div>App</div>

function runApp() {
  render(<App />, document.getElementById('root'))
}

export default runApp