import React from 'react'
import './AddButton.css'
import STORE from '../../STORE'

class AddButton extends React.Component {
  state = {
    store: STORE,
    newTemplateName: '',
    newProfileName: '',
    selectTemplate: '',
    newStampName: '',
    selectProfile: '',
    newStampContent: '',
    whatToAdd: ''
  }

  resetState = () => {
    //trigger re-render
    this.setState({ requirementKey: Math.random() })
    this.setState({
      trigger:false
    })
  }

  handleTypeSelect = (e) => {
    console.log('handleSelect')
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
    // 
    if (this.state.trigger){
      this.resetState()
    }
    
  }

  createTemplate = (e) => {
    this.setState({
      whatToAdd: 'template'
    })
    console.log('in createTemplate')
    document.getElementById('template_text_box').classList.remove('invisible')
    document.getElementById('template-select-form').classList.add('invisible')
    document.getElementById('stamp_text_box').classList.add('invisible')
    document.getElementById('stamp_content_box').classList.add('invisible')
    document.getElementById('profile-select-form').classList.add('invisible')
  }

  createProfile = () => {
    this.setState({
      whatToAdd: 'profile'
    })
    console.log('in createProfile')
    document.getElementById('template_text_box').classList.add('invisible')
    document.getElementById('stamp_text_box').classList.add('invisible')
    document.getElementById('stamp_content_box').classList.add('invisible')
    document
      .getElementById('template-select-form')
      .classList.remove('invisible')
    document.getElementById('profile-select-form').classList.add('invisible')
    const template_selection = document.getElementById('template-select')
    const arr = this.state.store.template.map((tmpl) => tmpl.title)
    for (let i = 0; i < arr.length; i++) {
      let option = document.createElement('OPTION')
      let txt = document.createTextNode(arr[i])
      option.appendChild(txt)
      option.setAttribute('value', arr[i])
      template_selection.insertBefore(option, template_selection.lastChild)
    }
  }

  createStamp = () => {
    this.setState({
      whatToAdd: 'stamp'
    })
    console.log('in createStamp')
    document.getElementById('template_text_box').classList.add('invisible')
    document.getElementById('template-select-form').classList.add('invisible')
    document.getElementById('profile-select-form').classList.remove('invisible')
    const profile_selection = document.getElementById('profile-select')
    const arr = this.state.store.load_out.map((prof) => prof.title)
    for (let i = 0; i < arr.length; i++) {
      let option = document.createElement('OPTION')
      let txt = document.createTextNode(arr[i])
      option.appendChild(txt)
      option.setAttribute('value', arr[i])
      profile_selection.insertBefore(option, profile_selection.lastChild)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('in submit')

    if (this.state.whatToAdd === 'template') {
      console.log('template added')
      // this.templateSubmit()
      const text = document.getElementById('template_text_box').value
      this.setState({
        newTemplateName: text
      })
      console.log(text)
      //post to database
    }

    if (this.state.whatToAdd === 'profile') {
      console.log('profile added')
      const text = document.getElementById('profile_text_box').value
      const selected = document.getElementById('template-select').value
      this.setState({
        newProfileName: text,
        selectTemplate: selected
      })
      console.log(text)
      //post to database
    }

    if (this.state.whatToAdd === 'stamp') {
      console.log('stamp added')
      const text = document.getElementById('stamp_text_box').value
      const selected = document.getElementById('profile-select').value
      const content = document.getElementById('stamp_content_box').value
      this.setState({
        newStampName: text,
        selectedProfile: selected,
        newStampContent: content
      })
    }
    this.resetState()
   
  }

  createProfileTemplateSelect = (e) => {
    console.log('in createProfileTemplateSelect')
    console.log(e.target.value)
    document.getElementById('profile_text_box').classList.remove('invisible')
    //set flag to trigger re-render if not submitted
    this.setState({
      trigger:true
    })
  }

  createStampProfileSelect = (e) => {
    console.log('in createStampProfileSelect')
    console.log(e.target.value)
    document.getElementById('stamp_text_box').classList.remove('invisible')
    document.getElementById('stamp_content_box').classList.remove('invisible')
    //set flag to trigger re-render if not submitted
    this.setState({
      trigger:true
    })
  }

  render() {
    return (
      <main style={{ marginTop: '64px' }} key={this.state.requirementKey}>
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
            <option className="dropdown-content" value="selection">Select Button Type</option>
            <option value="template">Template Button</option>
            <option value="profile">Profile Button</option>
            <option value="stamps">Stamp Button</option>
          </select>

          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
        <input
          type="text"
          className=" template-title invisible"
          placeholder="New Template Name"
          id="template_text_box"
        />
        <form id="template-select-form" className="invisible">
          <select
            name="template-selection"
            id="template-select"
            onChange={(e) => this.createProfileTemplateSelect(e)}
          >
            <option
              value="Select Template"
              name="default"
              id="template_default_option"
            >
              Select Template
            </option>
          </select>
          <input
            type="text"
            className="profile-title invisible"
            placeholder="New Profile Name"
            id="profile_text_box"
          />
        </form>

        <form id="profile-select-form" className="invisible">
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
          </select>
          <input
            type="text"
            className="stamp-title invisible"
            placeholder="New Stamp Name"
            id="stamp_text_box"
          />
          <input
            type="text"
            className="stamp-content invisible"
            placeholder="New Stamp Content"
            id="stamp_content_box"
          />
        </form>
     {console.log(this.state)}
      </main>
    )
  }
}

export default AddButton
