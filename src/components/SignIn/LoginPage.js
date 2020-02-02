import React, { Component } from 'react'
import LoginForm from './LoginForm'
// import { Section } from '../../components/Utils/Utils'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    console.log('in handleLoginSuccess');
    console.log('logged in?', this.props.isLoggedIn)
    this.props.history.push('/stamps')
    this.props.handleLogin()
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login!!</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}
