import React from 'react'
import Toolbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import BackDrop from './components/Backdrop/Backdrop'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowerRouter as Router } from 'react-router-dom'

// import Profile from './components/Profile/Profile'

import { Button } from './components/Button/Button'
import STORE from './STORE'

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id
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

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
  }

  render() {
    const templateRow = this.state.store.template.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(this.state.store.template[i].id)}
          template={this.state.selectedTemplate}
        >
          {this.state.store.template[i].title}
        </Button>
      )
    })

    const profileRow = this.state.store.load_out
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button key={prof.id} onClick={() => this.profileSelect(prof.id)}>
            {prof.title}
          </Button>
        )
      })

    const stampRow = this.state.store.stamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
          >
            {stamp.title}
          </Button>
        )
      })

    let backdrop
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        <div>{backdrop}</div>

        <main style={{ marginTop: '64px' }}>
          <div className="template">{templateRow} </div>
          <hr className="hr" />

          <div>{profileRow}</div>
          <hr className="hr" />
          <div>{stampRow}</div>
        </main>
      </div>
    )
  }
}

export default App
