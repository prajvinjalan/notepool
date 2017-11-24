import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { NotFound } from '../presentation'

// Named export - component for Routes that aren't found
export const RouteNotFound = () => {
      return <Redirect to={{ state: { notFoundError: true } }} />
}

// Named export - component that returns a 'NotFound' component if 'RouteNotFound' was rendered, otherwise returns all other children
export const CaptureRouteNotFound = withRouter(({children, location}) => {
  return location && location.state && location.state.notFoundError ? <NotFound path={location.pathname}/> : children;
});

// Renders a custom route component based on user authentication
const PrivateRouteComponent = ({ component: Component, ...rest }) => {
  // Returns the custom component if the user is authenticated
  if (rest.authenticated) {
    return (
      <Route {...rest} render={props => (
        <Component {...props}/>
      )}/>
    )
  }
  // Redirects to login page if user is not authenticated
  return (
    <Route {...rest} render={props => (
      <Redirect to={{
        pathname: '/profile/login',
        state: { from: props.location }
      }}/>
    )}/>
  )
}

// Maps state objects to props
const stateToProps = (state) => ({
  authenticated: state.user.authenticated
})

// Connects state object to given component and exports
export const PrivateRoute = connect(stateToProps)(PrivateRouteComponent)
