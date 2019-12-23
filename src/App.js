import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'

// import Profile from './components/Profile/Profile'

import { Button } from './components/Button/Button'
import STORE from './STORE'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile : STORE.stamps[0].load_out_id
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
  //   console.log(this.state.store.template.title)
  // return <Button key={this.state.store.template.id}>{this.state.store.template.title}</Button>

  // return <Button key={this.state.store.template.id}>Profile</Button>
  //}

  render() {
    const templateRow = this.state.store.template.map((templ, i) => {
      return (
        <Button key={templ.id}>{this.state.store.template[i].title}</Button>
      )
    })

    console.log('this.state.store')
    console.log(this.state.store)

    
    console.log('loadout->' )
    console.log(this.state.store.load_out);
    

     
    const profileRow = this.state.store.load_out
      .filter((selected) => selected.template_id === this.state.selectedTemplate)

      .map((prof, i) => {
        return (
          <Button key={prof.id} >{this.state.store.load_out[i].title} </Button>
        )
      })

      

    let backdrop
    console.log('profile row is -')
    console.log(profileRow)
    console.log('selected template-')
    console.log(this.state.selectedTemplate)

    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }
    console.log(this.state)

    return (
      <div   style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        <div >
         {backdrop}
        </div>


        <main style={{ marginTop: '64px' }}>
          <div className="template">{templateRow} </div>
          <hr className="hr" />
          <div onDrop={e=>(console.log(e))} >{profileRow}</div>
          <hr className="hr" />

          {/*<Category />
        <StampPad />
        <Footer /> */}
        </main>
      </div>
    )
  }
}

export default App
