import React, { Component } from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

import Navbar from '../containers/Navbar'
import Footer from '../layout/Footer'

class NotFound extends Component {
  render(){
    return(
      <div>
        <Navbar />
        <Container textAlign='center'>
          <Grid verticalAlign='middle' style={{minHeight: '435px'}}>
            <Grid.Column>
              <Header size='large' icon>
                <Icon name='dont' />
                Error 404
                <Header.Subheader style={{marginTop: '1rem'}}>
                  We couldn't find the requested URL <span style={{fontWeight: 'bold'}}>{this.props.path}</span> on the server.
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default NotFound
