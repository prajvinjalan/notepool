import React, { Component } from 'react';

// Component for closing the auth window and redirecting to main window
class AuthSuccess extends Component {
  componentDidMount(){
    window.opener.open('/redirect', '_self');
    window.opener.focus();
    window.close();
  }

  render(){
    return(
      <div>
        AUTH SUCCESS!
      </div>
    )
  }
}

export default AuthSuccess
