import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StampPad from './components/StampPad/StampPad.js'
// import ConfigurePage from './components/ConfigurePage/ConfigurePage'
import CreateAccount from './components/CreateAccount/CreateAccount'


// import Configure2 from './components/Configure2/Configure2'
import Config3 from './components/Configure2/Config3'

import SignIn from './components/SignIn/SignIn'

import AddButton from './components/AddButton/AddButton'
import EditButton2 from './components/EditButton/EditButton2'

// import { Button } from './components/Button/Button'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    isLoggedIn: false,
    

  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }
  // this darkens the screen behind modals or popout menus
  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    })
  }



  handleDataCallback=(page)=> {
    console.log('in data callback')
    console.log(this)
    // this.setState({
    //   onPage: page
    // })
    console.log(page)
  }

  render() {
    let backdrop
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }} >
      <Router>
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
          onpage={this.state.onPage}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        <div>{backdrop}</div>
        
          <main style={{ marginTop: '64px' }}>
            {/* <Route
              path="/stamps"
              render={(props) => (
                <StampPad {...props} changepage={this.handleDataCallback} />
              )}
            /> */}
            <Route path="/stamps" component={StampPad} />
            {/* <Route path="/configure" component={Configure2} /> */}
            <Route path="/configure" component={Config3} />
            <Route path="/" exact component={LandingPage} />
            <Route path="/create_account" component={CreateAccount} />
            <Route path="/sign_in" component={SignIn} />
            <Route path="/add_button" component={AddButton} />
            <Route path="/edit_button" component={EditButton2} />

          </main>
        </Router>
      </div>
    )
  }
}

export default App
