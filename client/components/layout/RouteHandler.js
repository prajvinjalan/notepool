import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { NotFound } from '../presentation'

export const RouteNotFound = () => {
      return <Redirect to={{ state: { notFoundError: true } }} />
}

export const CaptureRouteNotFound = withRouter(({children, location}) => {
  return location && location.state && location.state.notFoundError ? <NotFound path={location.pathname}/> : children;
});

const PrivateRouteComponent = ({ component: Component, ...rest }) => {
  if (rest.authenticated) {
    return (
      <Route {...rest} render={props => (
        <Component {...props}/>
      )}/>
    )
  }
  return (
    <Route {...rest} render={props => (
      <Redirect to={{
        pathname: '/profile/login',
        state: { from: props.location }
      }}/>
    )}/>
  )
}

const stateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export const PrivateRoute = connect(stateToProps)(PrivateRouteComponent)
