import React from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { NotFound } from '../presentation'

export const RouteNotFound = () => {
      return <Redirect to={{ state: { notFoundError: true } }} />
}

export const CaptureRouteNotFound = withRouter(({children, location}) => {
  return location && location.state && location.state.notFoundError ? <NotFound path={location.pathname}/> : children;
});
