import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Input } from 'semantic-ui-react'

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

  // Handles changes to register and login page inputs
  handleInputChange = (event) => {
    let updatedUser = {...this.state.newUser};
    updatedUser[event.target.id] = event.target.value;
    this.setState({
      newUser: updatedUser
    });
  }

  // Calls the 'buttonClick' prop (based on whether register or login was rendered)
  buttonClick = () => {
    let user = {...this.state.newUser};
    this.props.buttonClick(user);
  }

  googleAuth = () => {
    this.props.googleAuth();
  }

  render(){
    return(
      <div>
        <Container className='logreg container'>
          <Header size='huge' className='logreg header'>{this.props.title}</Header>
          <p className='logreg paragraph'>{this.props.description}</p>
          <Grid columns='equal'>
            <Grid.Column verticalAlign='middle'>
              {this.props.isRegister &&
                <Input fluid id="name" icon='user' iconPosition='left' placeholder='Name' onChange={this.handleInputChange} className='logreg input' />
              }
              <Input fluid id="email" icon='mail' iconPosition='left' placeholder='Email' onChange={this.handleInputChange} className='logreg input' />
              <Input fluid id="password" icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleInputChange} className='logreg input' />
              <Button size='medium' fluid color='green' onClick={this.buttonClick}>{this.props.title}</Button>
            </Grid.Column>
            <Grid.Column width={1}>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Button size='medium' fluid color='google plus' onClick={this.googleAuth}>
                <Icon name='google plus' /> Google
              </Button>
              <br />
              <Button size='medium' fluid color='twitter'>
                <Icon name='twitter' /> Twitter
              </Button>
              <br />
              <Button size='medium' fluid color='facebook'>
                <Icon name='facebook' /> Facebook
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <Container className='logreg container bottom'>
          {this.props.switchDescription} <Link to={this.props.isRegister ? '/profile/login' : '/profile/register'}>{(this.props.title == 'Login' ? 'Register' : 'Login')}</Link>
        </Container>
      </div>
    )
  }
}

export default LogReg
