import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './StampPad.css'

class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id,
    storeTemplate: STORE.template,
    storeProfile: STORE.load_out,
    storeStamps: STORE.stamps
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
    const templateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          // onClick={() => this.templateSelect(this.state.storeTemplate[i].id)}
          onMouseOver={() => this.templateSelect(this.state.storeTemplate[i].id)}
          template={this.state.selectedTemplate}
        >
          {this.state.storeTemplate[i].title}
        </Button>
      )
    })

    const profileRow = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            // onClick={() => this.profileSelect(prof.id)}
            // onMouseEnter={() => console.log('mouse')}
            onMouseOver={() => this.profileSelect(prof.id)}
            draggable
          >
            {prof.title}
          </Button>
        )
      })

    const stampRow = this.state.storeStamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            draggable
          >
            {stamp.title}
          </Button>
        )
      })

    return (
      <div className="main-wrapper">
        <div style={{ height: '100%' }} className="stampButtons">
          <main style={{ marginTop: '64px' }}>
            <div className="template-row">
              <div className="spacer" />
              <div className="template">{templateRow} </div>
              <div className="spacer" />
            </div>

            <hr className="hr" />

            <div className="profile-row">
              <div className="spacer" />
              <div>{profileRow}</div>
              <div className="spacer" />
            </div>

            <hr className="hr" />

            <div className="stamps-row">
              <div className="">{stampRow}</div>

              <hr className="hr" />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default StampPad
