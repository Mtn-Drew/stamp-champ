import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './EditButton2.css'

// import AddButton from '../AddButton/AddButton'

const placeholder = document.createElement('li')
placeholder.className = 'placeholder'
class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id,
    showAddProfileForm: false,
    showAddTemplateForm: false,
    showAddStampForm: false,
    draggedButtonType: null
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

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
  }

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
  }

  render() {
    // {this.props.changepage('stamps')}

    const templateRow = this.state.store.template.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(this.state.store.template[i].id)}
          template={this.state.selectedTemplate}
          className="template_button"
        >
          {this.state.store.template[i].title}
        </Button>
      )
    })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    const profileRow = this.state.store.load_out
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            onClick={() => this.profileSelect(prof.id)}
            // onMouseEnter={() => console.log('mouse')}

            className="profile_button"
          >
            {prof.title}
          </Button>
        )
      })
    // .sort((a, b) => (a.i > b.i ? -1 : 1))

    const stampRow = this.state.store.stamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.store.stamps[i].title}
            text={this.state.store.stamps[i].content}
            className="stamps_button"
          >
            {stamp.title}
          </Button>
        )
      })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    return (
      <div style={{ height: '100%' }} className="mainPage">
        <main style={{ marginTop: '64px' }}>
          <h1>Edit Buttons!!</h1>

          <div className="buttonRow">
            <div className="spacer" />
            {templateRow}
            <div className="spacer" />
            
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            <div className="spacer" />
            
            {profileRow}
            
            <div className="spacer" />
            
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            <div className="spacer" />
            {stampRow}
            <div className="spacer" />
            
          </div>

          <hr className="hr" />

          
            
          
        </main>
      </div>
    )
  }
}

export default StampPad
