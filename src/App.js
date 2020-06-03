import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar'
import LandingPage from './components/LandingPage/LandingPage'
import StampPad from './components/StampPad/StampPad.js'
import CreateAccount from './components/CreateAccount/CreateAccount'
import LoginPage from './components/SignIn/LoginPage'
import AddButton from './components/AddButton/AddButton'
import EditButton from './components/EditButton/EditButton'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

class App extends React.Component {
  state = {
    isLoggedIn: false,
  }

  signOut = () => {
    console.log('in signOut')
    localStorage.clear()
    this.setState({
      isLoggedIn: false,
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Route
            path="/"
            render={(props) => (
              <Toolbar
                signOut={this.signOut}
                onPage={this.state.onPage}
                history={props.history}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />

          <main style={{ marginTop: '64px' }}>
            <Route path="/stamps" component={StampPad} />

            <Route path="/" exact component={LandingPage} />

            <PublicOnlyRoute path="/create_account" component={CreateAccount} />

            <Route path="/sign_in" component={LoginPage} />

            <PrivateRoute path="/add_button" component={AddButton} />

            <PrivateRoute path="/configure" component={EditButton} />
          </main>
        </Router>
      </div>
    )
  }
}

export default App
