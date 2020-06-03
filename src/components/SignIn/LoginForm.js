import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './LoginForm.css'

export default class LoginForm extends Component {
  
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = (e) => {
    e.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = e.target
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then((res) => {
        user_name.value = ''
        password.value = ''
        this.props.onLoginSuccess()
      })
      .catch((res) => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <div className="login-form-body">
      <div className="container container-body">
        <form
          id="form"
          className="LoginForm form"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <h2>Please Log In</h2>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name form-control">
            <label htmlFor="username">User name</label>
            <input
              required
              name="user_name"
              id="username"
              placeholder="Enter username"
              type="text"
            />
          </div>
          <div className="password form-control">
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="password"
              placeholder="Enter password" 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      </div>
    )
  }
}
