import React, { Component } from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'
import { Loading } from '../presentation'

// Component for Redirecting page (after authentication)
class Redirecting extends Component {
  componentDidMount(){
    this.props.authSuccess()
    .then(() => {
      this.props.history.push('/notes');
    });
  }

  render(){
    return(
      <div>
        <Loading />
      </div>
    )
  }
}

// Maps dispatch functions to props
const dispatchToProps = (dispatch) => ({
  authSuccess: () => dispatch(actions.authSuccess())
})

// Connects dispatch functions to this component
export default connect(null, dispatchToProps)(Redirecting)
