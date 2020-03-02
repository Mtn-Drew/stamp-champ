import React from 'react'
import AuthApiService from '../../services/auth-api-service'
import './CreateAccount.css'

class CreateAccount extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('in handleSubmit')
    const { email, user_name, password } = e.target

    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,

      email: email.value
    })
      .then((user) => {
        user_name.value = ''
        email.value = ''
        password.value = ''
        this.handleRegistrationSuccess()
      })
      .catch((res) => {
        this.setState({ error: res.error })
      })
  }

  handleRegistrationSuccess = (user) => {
    const { history } = this.props
    history.push('/sign_in')
  }

  render() {
    const { error } = this.state
    return ( <div className="login-form-body">
      <div className="container">
        <form
          id="form"
          className="form RegistrationForm"
          onSubmit={this.handleSubmit}
        >
          <header>
            <h3>Create Your Account</h3>
          </header>

          <div role="alert">{error && <p className="red">{error}</p>}</div>

          <div className="form-control">
            <label htmlFor="username">User name</label>

            <input
              name="user_name"
              type="text"
              required
              id="username"
              placeholder="Enter username"
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              required
              id="password"
              placeholder="Enter password"
            ></input>
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              required
              id="email"
              placeholder="Enter email"
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
      </div>
    )
  }
}

export default CreateAccount
