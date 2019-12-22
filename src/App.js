import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'

class App extends React.Component {
state = {
  sideDrawerOpen : false
}


  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }
  
  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    })
  }

  render() {

    let backdrop;

    if (this.state.sideDrawerOpen) {

      backdrop = <BackDrop click={this.backdropClickHandler}/>
    }
    return (
      <div style={{height: '100%'}}>
        <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main style={{ marginTop: '64px' }}>
          <p>content goes here</p>
          {/* <Profile />
        <Category />
        <StampPad />
        <Footer /> */}
        </main>
      </div>
    )
  }
}

export default App
