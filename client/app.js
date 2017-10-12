import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Home from './components/Home'

class App extends Component {
  render(){
    return(
      <div>
        Notepool
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
