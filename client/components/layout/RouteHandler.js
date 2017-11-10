import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'

import { Auth } from '../../utils'
import { NotFound } from '../presentation'

export const RouteNotFound = () => {
      return <Redirect to={{ state: { notFoundError: true } }} />
}

export const CaptureRouteNotFound = withRouter(({children, location}) => {
  return location && location.state && location.state.notFoundError ? <NotFound path={location.pathname}/> : children;
});

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/profile/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
