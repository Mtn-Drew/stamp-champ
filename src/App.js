import React from 'react'
import Toolbar from './components/Toolbar/Toolbar'

import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StampPad from './components/StampPad/StampPad.js'

import CreateAccount from './components/CreateAccount/CreateAccount'
import LoginPage from './components/SignIn/LoginPage'

import AddButton from './components/AddButton/AddButton'
import EditButton from './components/EditButton/EditButton'

import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    // isLoggedIn: false
    isLoggedIn: false
  }

  handleLogin = () => {
    console.log('in handleLogin')
    // this.setState({
    //   isLoggedIn: true
    // })
  }

  handleDataCallback = (page) => {
    console.log('in data callback')
    console.log(this)
    console.log(page)
  }

  signOut = (history) => {
    console.log('in signOut')
    localStorage.clear()
    this.setState({
      isLoggedIn: false
    })
    history.push('/')
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Route
            path="/"
            render={(props) => (
              <Toolbar
                //drawerClickHandler={this.drawerToggleClickHandler}
                onPage={this.state.onPage}
                signOut={this.signOut.bind(this, props.history)}
                history={props.history}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />

          <main style={{ marginTop: '64px' }}>
            <PrivateRoute path="/stamps" component={StampPad} />
            {/* <PrivateRoute path="/stamps" component={(props) => <StampPad {...props} handleLogin={this.handleLogin} />}/> */}

            <Route path="/" exact component={LandingPage} />

            <PublicOnlyRoute path="/create_account" component={CreateAccount} />

            <Route path="/sign_in" component={LoginPage} />
            {/* <Route
              path="/sign_in"
              render={(props) => (
                <LoginPage
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLoggedIn={this.handleLogin}
                />
              )}
            /> */}

            <PrivateRoute path="/add_button" component={AddButton} />
            <PrivateRoute path="/configure" component={EditButton} />
          </main>
        </Router>
      </div>
    )
  }
}

export default App
