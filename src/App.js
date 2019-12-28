import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom'
import StampPad from './components/StampPad/StampPad.js'
import ConfigurePage from './components/ConfigurePage/ConfigurePage'



import { Button } from './components/Button/Button'


class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    isLoggedIn : false,
       onPage: 'stamps'

    
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



  render() {
    
    let backdrop
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    return (
      
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} onpage={this.state.onPage}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        <div>{backdrop}</div>
        <Router>
        <main style={{ marginTop: '64px' }}>
          <Route path="/stamps" component={StampPad} />
          <Route path="/configure" component={ConfigurePage} />
          <Route path="/" exact component={LandingPage} />
         
        </main>
        </Router>
      </div>
      
    )
  }
}

export default App
