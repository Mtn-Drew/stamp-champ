import React from 'react'

import '../AddButton/AddButton.css'
import STORE from '../../STORE'

class EditButton extends React.Component {
  state = {
    requirementKey: '',
    store: STORE,
    whatToEdit: '',
    templateSelection: '',
    profileSelection: '',
    stampSelection: '',
    editObject: {}
  }

  handleTypeSelect = (e) => {
    console.log('handleSelect')
    const selection = e.target.value
    if (selection === 'template') {
      this.selectTemplate()
    }
    if (selection === 'profile') {
      this.selectProfile()
    }
    if (selection === 'stamps') {
      this.selectStamp()
    }
    //
    // if (this.state.trigger){
    //   this.resetState()
    // }
  }

  selectTemplate = () => {
    console.log('in selectTemplate')
    //show the form
    document
      .getElementById('template-select-form')
      .classList.remove('invisible')

    //fill the drop down with template names
    this.setState({ whatToEdit: 'template' })
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

  selectProfile = () => {
    console.log('in selectProfile')
    document.getElementById('template-select-form').classList.add('invisible')
    document.getElementById('profile-select-form').classList.remove('invisible')

    this.setState({ whatToEdit: 'profile' })
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

  selectStamp = () => {
    console.log('in selectStamp')
  }

  editTemplateSelection = (e) => {
    e.preventDefault()
    console.log('in editTemplateSelection')
    //show change name text box
    document.getElementById('template_text_box').classList.remove('invisible')
    this.setState({
      templateSelection: document.getElementById('template-select').value
    })
    // console.log(document.getElementById('template-select').value)
    // console.log(document.getElementById('template-select'))
    
    //do we need the editObject here?  We just change the name of the template; we can change it in state and update everything in state when "Done" is clicked
  }

  editProfileSelection = () => {
    console.log('in editProfileSelection')
    document.getElementById('profile_text_box').classList.remove('invisible')
    this.setState({
      profileSelection: document.getElementById('profile-select').value
    })
    //on selection, filter objects in store for matching profile name and get template associated with it
    //then display template with option to change in dropdown
    //one possibility - add field to store.load_out "template_title" and use that for display and filtering
    // once object is found, make a function to change title and a function to change associated template

    const selection = document.getElementById('profile-select').value

    //  const object = this.state.store.filter(this.checkAdult(selection))
    // console.log('object');
    // console.log(object);
    this.templateForm()
    document.getElementById('template-select-form').classList.remove('invisible')
  }


  templateForm = () => (
    <form id="template-select-form" className="invisible">
      <select
        name="template-selection"
        id="template-select"
        onChange={(e) => this.editTemplateSelection(e)}
        // onClick={(e) => this.editTemplateSelection(e)}
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
        className="template-title invisible"
        placeholder="New Template Name"
        id="template_text_box"
      />
    </form>
  )

  render() {
    return (
      <main style={{ marginTop: '64px' }} key={this.state.requirementKey}>
        <div>
          <h1>Edit Button</h1>
          <p>Template ->{this.state.templateSelection}</p>
          <p>Profile ->{this.state.profileSelection}</p>
          <p>Stamp ->{this.state.stampSelection}</p>
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

          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>

        {/* <form id="template-select-form" className="invisible">
          <select
            name="template-selection"
            id="template-select"
            onChange={(e) => this.editTemplateSelection(e)}
            
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
            className="template-title invisible"
            placeholder="New Template Name"
            id="template_text_box"
          />
        </form> */}
        {this.templateForm()}

        <form id="profile-select-form" className="invisible">
          <select
            name="profile-selection"
            id="profile-select"
            onChange={(e) => this.editProfileSelection(e)}
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
            className="profile-title invisible"
            placeholder="New Profile Name"
            id="profile_text_box"
          />
        </form>
      </main>
    )
  }
}

export default EditButton
