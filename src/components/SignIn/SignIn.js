import React from 'react'


class SignIn extends React.Component {

  handleClick = (e) => {
    console.log('handleClick');
  }
 
  render() {
    return(
      <div>
 <section id="create-account">
        <header>
          <h3>Sign in</h3>
        </header>
        <form className="signup-form">
          
          

          <div>
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          
          <button type="button" onClick={(e)=> {this.handleClick(e)}}>
            <a href="/stamps">Sign In</a></button>
        </form>
      </section>
      </div>
    )
  }
}

export default SignIn