import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'

import Profile from './components/Profile/Profile'

import { Button } from './components/Button/Button'
import dummyData from './dummyStore'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    // topButtonRow : dummyData.template
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    })
  }

  copyToClipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  // handleTopRow =()=> {
  // return <Button key={this.topButtonRow.id}>{this.state.topButtonRow.title}</Button>
  // }

  render() {
    let backdrop

    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    

    return (
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main style={{ marginTop: '64px' }}>
          <p>content goes here</p>

          <Button
            onClick={() => {
              console.log('You clicked me!')
            }}
            type='button'
            buttonStyle='btn--primary--outline'
            
          >
            Buy Now!
          </Button>
{/* <div>
  {this.state.topButtonRow.map(this.handleTopRow)}
</div> */}
          <Profile />
          {/*<Category />
        <StampPad />
        <Footer /> */}
        </main>
      </div>
    )
  }
}

export default App
