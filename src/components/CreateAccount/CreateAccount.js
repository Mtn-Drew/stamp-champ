import React from 'react'
import AuthApiService from '../../services/auth-api-service'

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

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/sign_in')
  }

  render() {
    const { error } = this.state
    return (
      <div>
        <section id="create-account">
          <header>
            <h3>Create Your Account</h3>
          </header>
          <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
        
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__full_name'>
            User name 
          </label>
          <input
            name='user_name'
            type='text'
            required
            id='RegistrationForm__full_name'>
          </input>
        </div>
        
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password 
          </label>
          <input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </input>
        </div>
        <div className='nick_name'>
          <label htmlFor='RegistrationForm__nick_name'>
            Email   
          </label>
          <input
            name='email'
            type='text'
            required
            id='RegistrationForm__nick_name'>
          </input>
        </div>
        <button type='submit'>
          Register
        </button>
      </form>
        </section>
      </div>
    )
  }
}

export default CreateAccount
