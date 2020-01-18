import React from 'react'
import Toolbar from './components/Toolbar/Toolbar'

import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StampPad from './components/StampPad/StampPad.js'

import CreateAccount from './components/CreateAccount/CreateAccount'
// import SignIn from './components/SignIn/SignIn'
import SignIn from './components/SignIn/LoginPage'
import AddButton from './components/AddButton/AddButton'
import EditButton from './components/EditButton/EditButton'

import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    // isLoggedIn: false
    isLoggedIn: true
  }

  handleDataCallback = (page) => {
    console.log('in data callback')
    console.log(this)
    console.log(page)
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Toolbar
            drawerClickHandler={this.drawerToggleClickHandler}
            onpage={this.state.onPage}
          />

          <main style={{ marginTop: '64px' }}>
            


            <PrivateRoute path="/stamps" component={StampPad} />

            <Route path="/" exact component={LandingPage} />

            <PublicOnlyRoute
             path="/create_account" component={CreateAccount} />



            <Route path="/sign_in" component={SignIn} />


            <PrivateRoute path="/add_button" component={AddButton} />
            <PrivateRoute path="/configure" component={EditButton} />
          </main>
        </Router>
      </div>
    )
  }
}

export default App
