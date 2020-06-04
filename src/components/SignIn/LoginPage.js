import React, { Component } from 'react'
import LoginForm from './LoginForm'
import './LoginPage.css'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  handleLoginSuccess = () => {
    this.props.history.push('/stamps')
    this.props.handleLogin()
  }

  render() {
    return (
      <section className="LoginPage">
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    )
  }
}
