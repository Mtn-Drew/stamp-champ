import React, { Component } from 'react'
import Toolbar from '../Navbar/Navbar'

 class LandingPage extends Component {
  render() {
    return (
     
      <div>
    
    <main role="main">
      <header role="banner" id="top">
        <h1>Stamp Champ</h1>
        <h2>Your Digital Rubber Stamp</h2>
      </header>
      <section>
        <header>
          <h3>
            Take the drudgery out of frequently copying and pasting the same
            information over and over...
          </h3>
        </header>
        <p>[<em>placeholder for gif of click and copy</em>]</p>
        <p>
          Copy Mate takes your most copied items and stores them in a button
          that you simply click to access. Click and paste. That's it.
        </p>
      </section>
      <section>
        <header>
          <h3>Completely Customizable.</h3>
        </header>
        <p>
          [<em>placeholder for gif of editing text and label for button</em>]
        </p>
        <p>
          Choose from pre-made copies, or create your own. Each button is
          customizable, and can include whatever text you choose.
        </p>
      </section>
      <section>
        <header>
          <h3>
            Share your custom layout with friends or co-workers, or download a
            layout pre-build by your employer.
          </h3>
        </header>
        <p>[<em>placeholder for gif of uploading custom template</em>]</p>
        <p>
          Its as easy as downloading or uploading a csv file, right from the
          app.
        </p>
      </section>
      <section id="create-account">
        <header>
          <h3>Create Your Account</h3>
        </header>
        <form className="signup-form">
          <div>
            <label htmlFor="first-name">First name</label>
            <input
              placeholder="First Name"
              type="text"
              name="first-name"
              id="first-name"
            />
          </div>
          <div>
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label htmlFor="username">Email</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
    <footer role="content-info">Footer</footer>
  </div>
    )
  }
}

export default LandingPage