import React from 'react'
import './AddButton.css'
import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'
import { Button } from '../Button/Button'

class AddButton extends React.Component {

  state = {
    storeTemplate: [],
    storeProfile: [],
    storeStamps: [],
    whatToAdd: '',
    templateTextBoxIsVisible: false,
    templateSelectFormIsVisible: false,
    profileTextBoxIsVisible: false,
    profileSelectFormIsVisible: false,
    stampTextBoxIsVisible: false,
    stampContentBoxIsVisible: false,
    selectedProfile: this.props.selectedProfile,
    selectedTemplate: this.props.selectedTemplate,
    disabled: true,
    textareaValue: '',
    errorMessage: '',
    selectedOption: '',
    templateSelectValue: 'Assign to which template?',
    profileSelectValue: 'Assign to which profile?'
  }

  resetState = () => {
    this.setState({ requirementKey: Math.random() })
    this.setState({
      trigger: false,
      disabled: true
    })
  }

  handleTypeSelect = (e) => {
    TemplateService.getTemplates((value) =>
      this.setState({
        storeTemplate: value
      })    
    )
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
    const selection = e.target.value
    if (selection === 'template') {
      this.createTemplate()
    }
    if (selection === 'profile') {
      this.createProfile()
    }
    if (selection === 'stamps') {
      this.createStamp()
    }
  }

  createTemplate = (e) => {
    this.setState({
      whatToAdd: 'template'
    })
    this.setState({
      templateTextBoxIsVisible: true,
      templateSelectFormIsVisible: false,
      profileTextBoxIsVisible: false,
      profileSelectFormIsVisible: false,
      stampTextBoxIsVisible: false,
      stampContentBoxIsVisible: false
    })
  }

  createProfile = () => {
    this.setState({
      whatToAdd: 'profile'
    })
    this.setState({
      templateTextBoxIsVisible: false,
      templateSelectFormIsVisible: true,
      profileTextBoxIsVisible: false,
      profileSelectFormIsVisible: false,
      stampTextBoxIsVisible: false,
      stampContentBoxIsVisible: false
    })
  }

  createStamp = () => {
    this.setState({
      whatToAdd: 'stamp'
    })

    this.setState({
      templateTextBoxIsVisible: false,
      templateSelectFormIsVisible: false,
      profileTextBoxIsVisible: false,
      profileSelectFormIsVisible: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.whatToAdd === 'template') {
      const text = this.state.textBoxValue
      const duplicate = this.state.storeTemplate.filter(
        (tmpl) => tmpl.title === text
      )
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return 
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const newTemplate = {
        title: text,
        owner_id: this.props.owner_id
      }
      const tempArray = this.state.storeTemplate.concat(newTemplate)
      this.setState({
        storeTemplate: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      TemplateService.addTemplate(newTemplate) 
      this.setState({
        templateSelectValue: 'Assign to which template?'
      })
    }

    if (this.state.whatToAdd === 'profile') {
      const text = this.state.textBoxValue
      const duplicate = this.state.storeProfile.filter(
        (prof) => prof.title === text
      )
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return //('duplicate title detected')
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const selected = this.state.templateSelectValue
      const tmpl = this.state.storeTemplate.filter((obj) => {
        return obj.title === selected
      })
      const newProfile = {
        title: text,
        template_id: tmpl[0].id,
        owner_id: tmpl[0].owner
      }
      const tempArray = this.state.storeProfile.concat(newProfile)
      this.setState({
        storeProfile: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      ProfilesService.addProfile(newProfile)
      this.setState({
        profileSelectValue: 'Assign to which profile?'
      })
    }
    if (this.state.whatToAdd === 'stamp') {
      const text = this.state.textBoxValue
      const duplicate = this.state.storeStamps.filter(
        (stmp) => stmp.title === text
      )
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return 
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const selected = this.state.profileSelectValue
      const prof = this.state.storeProfile.filter((obj) => {
        return obj.title === selected
      })
      const content = this.state.textareaValue        
      const newStamp = {
        title: text,
        template_id: prof[0].template_id,
        content: content,
        owner_id: prof[0].owner_id,
        profile_id: prof[0].id
      }
      const tempArray = this.state.storeStamps.concat(newStamp)
      this.setState({
        storeStamps: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      StampsService.addStamps(newStamp)
    }
    this.resetState()
    this.setState({
      templateTextBoxIsVisible: false,
      templateSelectFormIsVisible: false,
      profileTextBoxIsVisible: false,
      profileSelectFormIsVisible: false,
      stampTextBoxIsVisible: false,
      stampContentBoxIsVisible: false,
      templateSelectValue: 'Assign to which template?',
      profileSelectValue: 'Assign to which profile?'
    })
  }

  createProfileTemplateSelect = (e) => {
    this.setState({
      templateSelectValue: e.target.value
    })
    if (e.target.value !== 'Assign to which template?') {
      const tmpl = this.state.storeTemplate.filter((obj) => {
        return obj.title === e.target.value
      })
      if (tmpl[0].id === undefined) {
        this.reloadButtons()
        e.target.value = this.state.selectedOption
      }
      this.props.onTemplateSelect(tmpl[0].id)
    }
    if (e.target.value === 'Assign to which template?') {
      this.setState({ disabled: true })
    }

    this.setState({
      trigger: true,
      profileTextBoxIsVisible: true,
      selectedTemplate: e.target.value
    })
  }

  createStampProfileSelect = (e) => {
    this.setState({
      profileSelectValue: e.target.value
    })
    if (e.target.value !== 'Assign to which profile?') {
      const prof = this.state.storeProfile.filter((obj) => {
        return obj.title === e.target.value
      })
      if (prof[0].id === undefined) {
        this.reloadButtons()
        e.target.value = this.state.selectedOption
      }
      this.props.onProfileSelect(prof[0].id)
    }
    if (e.target.value === 'Assign to which profile?') {
      this.setState({ disabled: true })
    }
    this.setState({
      trigger: true,
      stampTextBoxIsVisible: true,
      stampContentBoxIsVisible: true,
      selectedProfile: e.target.value
    })
  }

  handleTextBox = (e) => {
    const text = e.target.value.trim()
    if (text === '') {
      this.setState({
        disabled: true
      })
    } else {
      this.setState({
        disabled: false,
        textBoxValue: text
      })
    }
  }

  handleTextarea = (e) => {
    this.setState({
      textareaValue: e.target.value
    })
  }

  reloadButtons = () => {
    TemplateService.getTemplates((value) =>
      this.setState({
        storeTemplate: value
      })
    )
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })

    Promise.all([
      StampsService.getStamps(),
      ProfilesService.getProfiles(),
      TemplateService.getTemplates()
    ])
      .then((res) => {
        this.setState({ storeStamps: res[0] })
        this.setState({ storeProfile: res[1] })
        this.setState({ storeTemplate: res[2] })
      })
      .catch((e) => {
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
  }

  componentDidMount() {
    this.reloadButtons()   
  }

  render() {
    
    const templateSelectOptions = this.state.storeTemplate.map((temp, i) => {
      return (
        <option key={i} value={temp.title}>
          {temp.title}
        </option>
      )
    })
    const profileSelectOptions = this.state.storeProfile.map((prof, i) => {
      return (
        <option key={i} value={prof.title}>
          {prof.title}
        </option>
      )
    })
    return (
      <main key={this.state.requirementKey}>
        {this.state.errorMessage}
        <div>
          <h1>Add Button></h1>
        </div>
        <form id="main-form" className="customSelect">
          <div className="select">
            <select
              name="button-type"
              id="button-type-dropdown"
              onChange={this.handleTypeSelect}
              className="dropdown dropbtn select-css"
            >
              <option className="dropdown-content" value="selection">
                Select Button Type
              </option>
              <option value="template">Template Button</option>
              <option value="profile">Profile Button</option>
              <option value="stamps">Stamp Button</option>
            </select>
          </div>
        </form>
        <input
          type="text"
          className={
            this.state.templateTextBoxIsVisible
              ? 'template-title show text-box'
              : 'template-title hide'
          }
          placeholder="New Template Name"
          id="template_text_box"
          onChange={this.handleTextBox}
        />
        <form
          id="template-select-form"
          className={
            this.state.templateSelectFormIsVisible
              ? 'show customSelect'
              : 'hide'
          }
        >
          <div className="select">
            <select
              name="template-selection"
              id="template-select"
              onChange={(e) => this.createProfileTemplateSelect(e)}
              required
              className="dropdown dropbtn select-css"
              value={this.state.templateSelectValue}
            >
              <option
                value="Assign to which template?"
                name="default"
                id="template_default_option"
              >
                Assign to which template?
              </option>
              {templateSelectOptions}
            </select>
          </div>
          <input
            type="text"
            className={
              this.state.profileTextBoxIsVisible ? 'show text-box' : 'hide'
            }
            placeholder="New Profile Name"
            id="profile_text_box"
            onChange={this.handleTextBox}
          />
        </form>
        <form
          id="profile-select-form"
          className={
            this.state.profileSelectFormIsVisible ? 'show customSelect' : 'hide'
          }
        >
          <div className="select">
            <select
              name="profile-selection"
              id="profile-select"
              onChange={(e) => this.createStampProfileSelect(e)}
              className="dropdown dropbtn select-css"
              value={this.state.profileSelectValue}
            >
              <option
                className="dropdown-content"
                value="Assign to which profile?"
                name="default"
                id="profile_default_option"
              >
                Assign to which profile?
              </option>
              {profileSelectOptions}
            </select>
          </div>
          <input
            type="text"
            className={
              this.state.stampTextBoxIsVisible ? 'show text-box' : 'hide'
            }
            placeholder="New Stamp Name"
            id="stamp_text_box"
            onChange={this.handleTextBox}
          />
          <textarea
            className={this.state.stampContentBoxIsVisible ? 'show' : 'hide'}
            placeholder="New Stamp Content"
            id="stamp_content_box"
            onChange={this.handleTextarea}
          ></textarea>
        </form>
        <Button
          buttonStyle={!this.state.disabled ? 'system' : 'system-disabled'}
          type="submit"
          value="Submit"
          onClick={!this.state.disabled ? this.handleSubmit : null}
          disabled={this.state.disabled}
        >
          Submit
        </Button>
      </main>
    )
  }
}

export default AddButton
