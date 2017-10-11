import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Notes from './components/Notes'

class App extends Component {
  render(){
    return(
      <div>
        Hello React!
        <Notes />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
