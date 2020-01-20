import React from 'react'
import './AddButton.css'
import STORE from '../../STORE'
import TemplateService from '../../services/template-service'
import uuid from 'react-uuid'

class AddButton extends React.Component {
  state = {
    // store: STORE,
    storeTemplate: STORE.template,
    storeProfile: STORE.load_out,
    storeStamps: STORE.stamps,
    // newStampName: '',
    // selectProfile: '',
    // newStampContent: '',
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
    textareaValue: ''
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
      this.resetState()
    }
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
  }

  // find_template_id = (obj) => {
  //   console.log('in find_template_id')
  //   console.log(obj)
  //   console.log('selectTemplate')
  //   console.log(this.state.selectTemplate)
  //   console.log('this.state')
  //   console.log(this.state)
  //   return obj.id === this.state.selectedTemplate
  // }

  handleSubmit = (e) => {
    console.log('in handleSubmit')
    e.preventDefault()
    if (this.state.whatToAdd === 'template') {
      const text = this.state.textBoxValue
      const newTemplate = {
        id: uuid(),
        title: text,
        owner_id: '7e116f8f-e326-4727-83a7-59e2b626711f'
      }
      const tempArray = this.state.storeTemplate.concat(newTemplate)
      this.setState({
        storeTemplate: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('template added')
      TemplateService.addTemplate(newTemplate)
    }

    if (this.state.whatToAdd === 'profile') {
      const text = this.state.textBoxValue
      const selected = this.state.selectedTemplate
      // to get the template_id you will need to .filter storeTemplate to find the object with title of selectedTemplate

      const temp_id = this.state.storeTemplate.filter((obj) => {
        return obj.title === selected
      })

      const newProfile = {
        // id: '9',
        title: text,
        template_id: temp_id[0].id,
        order: this.state.storeProfile.length + 1
      }
      const tempArray = this.state.storeProfile.concat(newProfile)
      this.setState({
        storeProfile: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('profile added')
      console.log(this.state.storeProfile)
    }

    if (this.state.whatToAdd === 'stamp') {
      const text = this.state.textBoxValue

      const selected = this.state.selectedProfile

      const content = this.state.textareaValue

      // to get the template_id you will need to .filter storeTemplate to find the object with title of selectedTemplate

      const temp_id = this.state.storeProfile.filter((obj) => {
        return obj.title === selected
      })

      const newStamp = {
        id: '9hgsfd',
        title: text,
        load_out_id: temp_id[0].id,
        content: content,
        order: this.state.storeStamps.length + 1
      }
      const tempArray = this.state.storeStamps.concat(newStamp)
      this.setState({
        storeStamps: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd, tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('stamp added')
    }
    this.resetState()
    this.setState({
      templateTextBoxIsVisible: false,
    templateSelectFormIsVisible: false,
    profileTextBoxIsVisible: false,
    profileSelectFormIsVisible: false,
    stampTextBoxIsVisible: false,
    stampContentBoxIsVisible: false,
    })
  }

  createProfileTemplateSelect = (e) => {
    console.log('in createProfileTemplateSelect')

    if (e.target.value === 'Select Template') {
      this.resetState()
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

    if (e.target.value === 'Select Profile') {
      this.resetState()
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
    if (e.target.value === '') {
      this.setState({
        disabled: true
      })
    } else {
      this.setState({
        disabled: false,
        textBoxValue: e.target.value
      })
    }
  }

  handleTextarea = (e) => {
    if (e.target.value === '') {
      this.setState({
        disabled: true
      })
    } else {
      this.setState({
        disabled: false,
        textareaValue: e.target.value
      })
    }
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
        <div>
          <h1>Add Button></h1>
        </div>
        <form id="main-form">
          <select
            name="button-type"
            id="button-type-dropdown"
            onChange={this.handleTypeSelect}
            className="dropdown"
          >
            <option className="dropdown-content" value="selection">
              Select Button Type
            </option>
            <option value="template">Template Button</option>
            <option value="profile">Profile Button</option>
            <option value="stamps">Stamp Button</option>
          </select>

          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
            disabled={this.state.disabled}
          />
        </form>
        <input
          type="text"
          className={
            this.state.templateTextBoxIsVisible
              ? 'template-title show'
              : 'template-title hide'
          }
          placeholder="New Template Name"
          id="template_text_box"
          onChange={this.handleTextBox}
        />

        <form
          id="template-select-form"
          className={this.state.templateSelectFormIsVisible ? 'show' : 'hide'}
        >
          <select
            name="template-selection"
            id="template-select"
            onChange={(e) => this.createProfileTemplateSelect(e)}
            required
          >
            <option
              value="Select Template"
              name="default"
              id="template_default_option"
            >
              Select Template
            </option>
            {templateSelectOptions}
          </select>
          <input
            type="text"
            className={this.state.profileTextBoxIsVisible ? 'show' : 'hide'}
            placeholder="New Profile Name"
            id="profile_text_box"
            onChange={this.handleTextBox}
          />
        </form>

        <form
          id="profile-select-form"
          className={this.state.profileSelectFormIsVisible ? 'show' : 'hide'}
        >
          <select
            name="profile-selection"
            id="profile-select"
            onChange={(e) => this.createStampProfileSelect(e)}
          >
            <option
              value="Select Profile"
              name="default"
              id="profile_default_option"
            >
              Select Profile
            </option>
            {profileSelectOptions}
          </select>
          <input
            type="text"
            className={this.state.stampTextBoxIsVisible ? 'show' : 'hide'}
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
      </main>
    )
  }
}

export default AddButton
