import React from 'react'
import './AddButton.css'
import STORE from '../../STORE'

class AddButton extends React.Component {
  state = {
    store: STORE,
    storeTemplate: STORE.template,
    storeProfile: STORE.load_out,
    storeStamps: STORE.stamps,
    // newTemplateName: '',
    // newProfileName: '',
    // selectTemplate: '',
    newStampName: '',
    selectProfile: '',
    newStampContent: '',
    whatToAdd: ''
  }

  resetState = () => {
    //trigger re-render
    this.setState({ requirementKey: Math.random() })
    this.setState({
      trigger: false
    })
  }

  handleTypeSelect = (e) => {
    console.log('in handleTypeSelect')
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
    if (this.state.trigger) {
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
    const arr = this.state.storeTemplate.map((tmpl) => tmpl.title)
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
    const arr = this.state.storeProfile.map((prof) => prof.title)
    for (let i = 0; i < arr.length; i++) {
      let option = document.createElement('OPTION')
      let txt = document.createTextNode(arr[i])
      option.appendChild(txt)
      option.setAttribute('value', arr[i])
      profile_selection.insertBefore(option, profile_selection.lastChild)
    }
  }

  find_template_id = (obj) => {
    console.log('in find_template_id')
    console.log(obj)
    console.log('selectTemplate')
    console.log(this.state.selectTemplate)
    console.log('this.state')
    console.log(this.state)
    return obj.id === this.state.selectedTemplate
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('in handleSubmit')

    if (this.state.whatToAdd === 'template') {
      // this.templateSubmit()
      const text = document.getElementById('template_text_box').value
      // this.setState({
      //   newTemplateName: text
      // })
      console.log(text)

      const newTemplate = {
        id: '3',
        title: text,
        order: this.state.storeTemplate.length + 1
      }
      const tempArray = this.state.storeTemplate.concat(newTemplate)
      this.setState({
        storeTemplate: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd,tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('template added')
    }

    if (this.state.whatToAdd === 'profile') {
      const text = document.getElementById('profile_text_box').value
      const selected = document.getElementById('template-select').value
      // this.setState({
      //   newProfileName: text,
      //   selectTemplate: selected
      // })
      console.log(text)
      console.log(selected)
      console.log(this.state)
      // to get the template_id you will need to .filter storeTemplate to find the object with title of selectedTemplate
      // const temp_id = this.state.storeTemplate.filter(this.find_template_id())
      const temp_id = this.state.storeTemplate.filter((obj) => {
        console.log('in filter')
        console.log(obj)
        console.log(obj.id)
        console.log('selected')
        console.log(selected)
        return obj.title === selected
      })
      console.log('temp_id')
      console.log(temp_id)
      console.log(temp_id[0].id)
      const newProfile = {
        id: '9',
        title: text,
        template_id: temp_id[0].id,
        order: this.state.storeProfile.length + 1
      }
      const tempArray = this.state.storeProfile.concat(newProfile)
      this.setState({
        storeProfile: tempArray
      })
      this.props.onAddButton(this.state.whatToAdd,tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('profile added')
      console.log(this.state.storeProfile)
    }

    if (this.state.whatToAdd === 'stamp') {
      const text = document.getElementById('stamp_text_box').value
      const selected = document.getElementById('profile-select').value
      const content = document.getElementById('stamp_content_box').value
      // this.setState({
      //   newStampName: text,
      //   selectedProfile: selected,
      //   newStampContent: content
      // })

      console.log(text)
      console.log(selected)
      console.log(content)
      console.log(this.state)
      // to get the template_id you will need to .filter storeTemplate to find the object with title of selectedTemplate
      // const temp_id = this.state.storeTemplate.filter(this.find_template_id())
      const temp_id = this.state.storeProfile.filter((obj) => {
        console.log('in filter')
        console.log(obj)
        console.log(obj.id)
        console.log('selected')
        console.log(selected)
        return obj.title === selected
      })
      console.log('temp_id')
      console.log(temp_id)
      console.log(temp_id[0].id)
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
      this.props.onAddButton(this.state.whatToAdd,tempArray)
      //post to database and callback to configure to update state? ****************
      console.log('stamp added')
    }
    this.resetState()
  }

  createProfileTemplateSelect = (e) => {
    console.log('in createProfileTemplateSelect')
    console.log(e.target.value)
    document.getElementById('profile_text_box').classList.remove('invisible')
    //set flag to trigger re-render if not submitted   **********************************
    this.setState({
      trigger: true
    })
  }

  createStampProfileSelect = (e) => {
    console.log('in createStampProfileSelect')
    console.log(e.target.value)
    document.getElementById('stamp_text_box').classList.remove('invisible')
    document.getElementById('stamp_content_box').classList.remove('invisible')
    //set flag to trigger re-render if not submitted
    this.setState({
      trigger: true
    })
  }

  render() {

    return (
      <main  key={this.state.requirementKey}>
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
          <textarea
            className="stamp-content invisible"
            placeholder="New Stamp Content"
            id="stamp_content_box"
          ></textarea>
        </form>
        {/* {console.log(this.state)} */}
      </main>
    )
  }
}

export default AddButton
