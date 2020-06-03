import React from 'react'
import './AddButton.css'
// import STORE from '../../STORE'
import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'
// import uuid from 'react-uuid'
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
    // template_selection: '',
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
    console.log('in resetState')
    //trigger re-render
    this.setState({ requirementKey: Math.random() })
    this.setState({
      trigger: false,
      disabled: true
    })
  }

  handleTypeSelect = (e) => {
    console.log('in handleTypeSelect')
    console.log(e.target)
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
    if (this.state.trigger) {
      //this.resetState()
    }
    // this.props.onUpdateTemplates(this.state)
  }

  createTemplate = (e) => {
    console.log('in createTemplate')
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
    // this.props.onUpdateTemplates(this.state)
  }

  createProfile = () => {
    console.log('in createProfile')
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
    // this.props.onUpdateTemplates(this.state)
  }

  createStamp = () => {
    console.log('in createStamp')
    this.setState({
      whatToAdd: 'stamp'
    })

    this.setState({
      templateTextBoxIsVisible: false,
      templateSelectFormIsVisible: false,
      profileTextBoxIsVisible: false,
      profileSelectFormIsVisible: true
    })
    // this.props.onUpdateTemplates(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('in handleSubmit')
    if (this.state.whatToAdd === 'template') {
      const text = this.state.textBoxValue
      // loop through current array of templates and prevent duplicate name
      console.log('storeTemplate ->', this.state.storeTemplate)
      const duplicate = this.state.storeTemplate.filter(
        (tmpl) => tmpl.title === text
      )
      console.log('duplicate array->', duplicate)
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return console.log('duplicate title detected')
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const newTemplate = {
        title: text,
        owner_id: this.props.owner_id
      }
      console.log('new template', newTemplate)
      console.log('props--> ', this.props)
      const tempArray = this.state.storeTemplate.concat(newTemplate)
      this.setState({
        storeTemplate: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('template added')
      TemplateService.addTemplate(newTemplate) //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      this.setState({
        templateSelectValue: 'Assign to which template?'
      })
    }

    if (this.state.whatToAdd === 'profile') {
      const text = this.state.textBoxValue
      // loop through current array of profiles and prevent duplicate name
      console.log('storeProfile ->', this.state.storeProfile)
      const duplicate = this.state.storeProfile.filter(
        (prof) => prof.title === text
      )
      console.log('duplicate array->', duplicate)
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return console.log('duplicate title detected')
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const selected = this.state.templateSelectValue
      // to get the template_id you will need to .filter storeTemplate to find the object with title of selectedTemplate
      const tmpl = this.state.storeTemplate.filter((obj) => {
        return obj.title === selected
      })
      console.log('tmpl=>', tmpl)
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
      console.log('templArray->', tempArray)
      console.log('profile added')
      console.log(this.state.storeProfile)
      console.log('newProfile ->', newProfile)
      ProfilesService.addProfile(newProfile)
      this.setState({
        profileSelectValue: 'Assign to which profile?'
      })
    }
    if (this.state.whatToAdd === 'stamp') {
      // const selectedProf = this.state.selectedProfile
      const text = this.state.textBoxValue
      // const selected = this.state.selectedProfile
      //get profile object with matching title from dropdown
      // loop through current array of profiles and prevent duplicate name
      console.log('storeStamps ->', this.state.storeStamps)
      const duplicate = this.state.storeStamps.filter(
        (stmp) => stmp.title === text
      )
      console.log('duplicate array->', duplicate)
      if (duplicate.length !== 0) {
        this.setState({
          errorMessage: 'Duplicate title names are not permitted'
        })
        return console.log('duplicate title detected')
      } else {
        this.setState({
          errorMessage: ''
        })
      }
      const selected = this.state.profileSelectValue
      const prof = this.state.storeProfile.filter((obj) => {
        console.log('obj.title ', obj.title)
        console.log('selectedProf ', selected)
        return obj.title === selected
      })
      const content = this.state.textareaValue        
      console.log('prof->', prof)
      const newStamp = {
        title: text,
        template_id: prof[0].template_id,
        content: content,
        owner_id: prof[0].owner_id,
        profile_id: prof[0].id
      }
      console.log('prof', prof)
      console.log('new stamp', newStamp)
      const tempArray = this.state.storeStamps.concat(newStamp)
      this.setState({
        storeStamps: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('stamp added')
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
    console.log('in createProfileTemplateSelect')
    console.log('e.target->', e.target)
    console.log('e.target.value ', e.target.value)
    this.setState({
      templateSelectValue: e.target.value
    })
    if (e.target.value !== 'Assign to which template?') {
      const tmpl = this.state.storeTemplate.filter((obj) => {
        console.log('obj.title, e.target.value ', obj.title, e.target.value)
        return obj.title === e.target.value
      })
      //if selection has no id, get all templates and try again??
      if (tmpl[0].id === undefined) {
        console.log('in undefined ')
        console.log('e.target.value ', e.target.value)
        //console.log('this.state.selectedOption ', this.state.selectedOption)
        this.reloadButtons()
        e.target.value = this.state.selectedOption
      }
      console.log('id---', tmpl[0].id)
      this.props.onTemplateSelect(tmpl[0].id)
    }
    if (e.target.value === 'Assign to which template?') {
      this.setState({ disabled: true })
    }
    //set flag to trigger re-render if not submitted   **********************************
    this.setState({
      trigger: true,
      profileTextBoxIsVisible: true,
      selectedTemplate: e.target.value
    })
  }

  createStampProfileSelect = (e) => {
    console.log('in createStampProfileSelect')
    console.log('e.target.value ', e.target.value)
    this.setState({
      profileSelectValue: e.target.value
    })
    if (e.target.value !== 'Assign to which profile?') {
      const prof = this.state.storeProfile.filter((obj) => {
        console.log(obj.title, e.target.value)
        return obj.title === e.target.value
      })
      if (prof[0].id === undefined) {
        console.log('in prof undefined')
        this.reloadButtons()
        e.target.value = this.state.selectedOption
      }
      this.props.onProfileSelect(prof[0].id)
    }
    if (e.target.value === 'Assign to which profile?') {
      this.setState({ disabled: true })
    }
    //set flag to trigger re-render if not submitted
    this.setState({
      trigger: true,
      stampTextBoxIsVisible: true,
      stampContentBoxIsVisible: true,
      selectedProfile: e.target.value
    })
  }

  handleTextBox = (e) => {
    //prevent title to be blank or only space(s)
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
      // disabled: false,
      textareaValue: e.target.value
    })
  }

  reloadButtons = () => {
    console.log('in reloadButtons..')
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
        console.log('error->', e)
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
    // this.props.onUpdateTemplates(this.state)
    // console.log('this.state======', this.state)
  }

  componentDidMount() {
    console.log('in addbutton componentdidmount')
    this.reloadButtons()   
  }

  render() {
    console.log('add button render')
    console.log('storeTemplate ', this.state.storeTemplate)
    console.log('storeProfile ', this.state.storeProfile)
    console.log('storeStamps', this.state.storeStamps)
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
