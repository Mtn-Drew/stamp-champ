import React from 'react'
import { Button } from '../Button/Button'
// import STORE from '../../STORE'
import './StampPad.css'
import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'

class StampPad extends React.Component {
  state = {
    // store: STORE,
    // selectedTemplate: {},
    // selectedProfile: {},
    storeTemplate: [],
    storeProfile: [],
    storeStamps: [],
    isLoaded: false,
    items: [],
    stampValue: ''
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
      selectedProfile: profileId,
      stampValue: ''
    })
    console.log('selected profile is ', this.state.selectedProfile)
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId,
      stampValue:''
    })
  }

  stampSelect = (stampContent) => {
    this.setState({
      stampValue: stampContent
    })
  }

  componentDidMount() {
    TemplateService.getTemplates((value) => this.setTemplates(value))
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
  }

  setTemplates = (value) => {
    //use this setup if there is more state to set ----------------------------------------
    this.setState({
      storeTemplate: value
    })
  }

  displayStamp = (e) => {}

  render() {
    console.log('in RENDER SP')
    console.log('storeTemplate', this.state.storeTemplate)
    console.log('storeProfile', this.state.storeProfile)
    console.log('storeStamps', this.state.storeStamps)
    const templateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onMouseOver={() =>
            this.templateSelect(templ.id)
          }
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
            onMouseOver={() =>
              this.profileSelect(prof.id)
            }
            profile={this.state.storeProfile}
          >
            {prof.title}
          </Button>
        )
      })

    const stampRow = this.state.storeStamps
      .filter((selected) => selected.profile_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            onMouseOver={() => {
              this.stampSelect(stamp.content)
            }}
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
            </div>
            <hr className="hr" />
            <div>
              <textarea
                name="stamp_display"
                id="stamp_display"
                cols="30"
                rows="30"
                value={this.state.stampValue}
                readOnly
              />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default StampPad
