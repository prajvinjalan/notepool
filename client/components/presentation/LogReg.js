import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    let updatedUser = Object.assign({}, this.state.newUser);
    updatedUser[event.target.id] = event.target.value;
    this.setState({
      newUser: updatedUser
    });
  }

  buttonClick(){
    let user = Object.assign({}, this.state.newUser);
    this.props.buttonClick(user);
  }

  render(){
    return(
      <div className="container">
        <div style={styles.logreg.container}>
          <h1 style={styles.logreg.header}>{this.props.title}</h1>
          <p style={styles.logreg.paragraph}>{this.props.description}</p>
          <div style={styles.logreg.socialWrapper}>
            <button className="btn btn-danger">Google</button>
            <button className="btn btn-primary">Facebook</button>
            <button className="btn btn-info">Twitter</button>
          </div>
          {this.props.isRegister &&
            <fieldset className="form-group" style={styles.universal.formGroup}>
              <label htmlFor="name" style={styles.universal.formLabel}>Name</label>
              <input id="name" className="form-control" type="text" style={styles.logreg.formInput} onChange={this.handleInputChange.bind(this)}></input>
            </fieldset>
          }
          <fieldset className="form-group" style={styles.universal.formGroup}>
            <label htmlFor="email" style={styles.universal.formLabel}>Email</label>
            <input id="email" className="form-control" type="text" style={styles.logreg.formInput} onChange={this.handleInputChange.bind(this)}></input>
          </fieldset>
          <fieldset className="form-group" style={styles.universal.formGroup}>
            <label htmlFor="password" style={styles.universal.formLabel}>Password</label>
            <input id="password" className="form-control" type="password" style={styles.logreg.formInput} onChange={this.handleInputChange.bind(this)}></input>
          </fieldset>
          <button className="btn btn-success btn-block" onClick={this.buttonClick.bind(this)}>{this.props.title}</button>
        </div>
        <div style={Object.assign({}, styles.logreg.container, styles.logreg.container.bottom)}>
          {this.props.switchDescription} <Link to={this.props.isRegister ? '/profile/login' : '/profile/register'}>{(this.props.title == 'Login' ? 'Register' : 'Login')}</Link>
        </div>
      </div>
    )
  }
}

export default LogReg
