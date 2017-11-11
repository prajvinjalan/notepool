import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Input } from 'semantic-ui-react'

import styles from '../../styles.js'

class LogReg extends Component {
  constructor(props){
    super(props);

    this.state = {
      newUser: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  handleInputChange(event){
    let updatedUser = {...this.state.newUser};
    updatedUser[event.target.id] = event.target.value;
    this.setState({
      newUser: updatedUser
    });
  }

  buttonClick(){
    let user = {...this.state.newUser};
    this.props.buttonClick(user);
  }

  render(){
    return(
      <div>
        <Container style={styles.logreg.container}>
          <Header size='huge' style={styles.logreg.header}>{this.props.title}</Header>
          <p style={styles.logreg.paragraph}>{this.props.description}</p>
          <Grid columns='equal'>
            <Grid.Column verticalAlign='middle'>
              {this.props.isRegister &&
                <Input fluid id="name" icon='user' iconPosition='left' placeholder='Name' onChange={this.handleInputChange.bind(this)} style={{marginBottom: '2rem'}} />
              }
              <Input fluid id="email" icon='mail' iconPosition='left' placeholder='Email' onChange={this.handleInputChange.bind(this)} style={{marginBottom: '2rem'}} />
              <Input fluid id="password" icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleInputChange.bind(this)} style={{marginBottom: '2rem'}} />
              <Button size='huge' fluid color='green' onClick={this.buttonClick.bind(this)}>{this.props.title}</Button>
            </Grid.Column>
            <Grid.Column width={1}>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Button size='huge' fluid color='facebook'>
                <Icon name='facebook' /> Facebook
              </Button>
              <br />
              <Button size='huge' fluid color='twitter'>
                <Icon name='twitter' /> Twitter
              </Button>
              <br />
              <Button size='huge' fluid color='google plus'>
                <Icon name='google plus' /> Google Plus
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <Container style={{...styles.logreg.container, ...styles.logreg.container.bottom}}>
          {this.props.switchDescription} <Link to={this.props.isRegister ? '/profile/login' : '/profile/register'}>{(this.props.title == 'Login' ? 'Register' : 'Login')}</Link>
        </Container>
      </div>
    )
  }
}

export default LogReg
