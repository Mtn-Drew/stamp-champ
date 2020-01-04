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
    selectedTemplate: '1',
    selectedProfile: '1',
    selectedStamp: '1',
    storeTemplate: STORE.template,
    storeProfile: STORE.load_out,
    storeStamps: STORE.stamps,
    showAddProfileForm: false,
    showAddTemplateForm: false,
    showAddStampForm: false,
    triggerToggle : true
  }

  // copyToClipboard = (str) => {
  //   const el = document.createElement('textarea')
  //   el.value = str
  //   el.setAttribute('readonly', '')
  //   el.style.position = 'absolute'
  //   el.style.left = '-9999px'
  //   document.body.appendChild(el)
  //   el.select()
  //   document.execCommand('copy')
  //   document.body.removeChild(el)
  // }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
    console.log('in templateSelect')
  }

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
    console.log('in profileSelect')
  }

  stampSelect = (stampId) => {
    this.setState({
      selectedStamp: stampId
    })
    console.log('in stampSelect')
  }

  triggerToggle = () => {
    console.log('in triggerToggle')
    this.setState({
      triggerToggle : !this.state.triggerToggle
    })
    !this.state.triggerToggle ? document.getElementById('edit-form').classList.add('invisible') : document.getElementById('edit-form').classList.remove('invisible')
    console.log(this.state.triggerToggle);
  }

  templateSelectEdit = (id) => {
    console.log('in templateSelectEdit');
    console.log('selected template id->');
    console.log(this.state.selectedTemplate);
    // set state to template id
  }

  profileSelectEdit = (id) => {
    console.log('in profileSelectEdit');
  }

  stampSelectEdit = (id) => {
    console.log('in stampSelectEdit');
  }

  render() {
    // {this.props.changepage('stamps')}
    
    const templateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          // onClick={() => this.templateSelect(this.state.store.template[i].id)}
          onClick={() => this.templateSelect(templ.id)} //change to storeTemplate?? *******************
          template={this.state.selectedTemplate}
          className="template_button edit-select"
        >
          {this.state.storeTemplate[i].title}
        </Button>
      )
    })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    const profileRow = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            onClick={() => this.profileSelect(prof.id)} //change to storeTemplate?? *******************
            // onMouseEnter={() => console.log('mouse')}

            className="profile_button "
          >
            {prof.title}
          </Button>
        )
      })
    // .sort((a, b) => (a.i > b.i ? -1 : 1))

    const stampRow = this.state.storeStamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            // onClick={() => this.copyToClipboard(stamp.content)}  //change to storeTemplate?? *******************
            onClick={() => this.stampSelect(stamp.id)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            className="stamps_button"
          >
            {stamp.title}
          </Button>
        )
      })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))
    
    const templateRowEdit = this.state.storeTemplate.map((templ, i) => {
      return (
        <button
          key={templ.id}
          // onClick={() => this.templateSelect(this.state.store.template[i].id)}
          onClick={() => this.templateSelectEdit(templ.id)} //change to storeTemplate?? *******************
          template={this.state.selectedTemplate}
          className="template_button edit-select"
        >
          {this.state.storeTemplate[i].title}
        </button>
      )
    })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    const profileRowEdit = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <button
            key={prof.id}
            onClick={() => this.profileSelectEdit(prof.id)} //change to storeTemplate?? *******************
            // onMouseEnter={() => console.log('mouse')}

            className="profile_button edit-select"
          >
            {prof.title}
          </button>
        )
      })
    // .sort((a, b) => (a.i > b.i ? -1 : 1))

    const stampRowEdit = this.state.storeStamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <button
            key={stamp.id}
            // onClick={() => this.copyToClipboard(stamp.content)}  //change to storeTemplate?? *******************
            onClick={() => this.stampSelectEdit(stamp.id)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            className="stamps_button edit-select"
          >
            {stamp.title}
          </button>
        )
      })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))


    return (
      <div style={{ height: '100%' }} className="mainPage ">
        <main style={{ marginTop: '64px' }}>

          <div style={{ display: 'flex' }}>
            <h1>Edit Buttons!!</h1>
            <div className="spacer" />
            <button id="select-trigger" onClick={() => this.triggerToggle()}>
              {' '}
              SELECT{' '}
            </button>
            <div className="spacer" />
          </div>

          <div className="buttonRow" id="button-row-template">
            <div className="spacer" />
            { this.state.triggerToggle ? templateRow : templateRowEdit}
            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div className="buttonRow" id="button-row-profile">
            <div className="spacer" />

            {this.state.triggerToggle ? profileRow : profileRowEdit}

            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div className="buttonRow" id="button-row-stamps">
            <div className="spacer" />
            {this.state.triggerToggle ? stampRow : stampRowEdit}
            <div className="spacer" />
          </div>

          <form className="toggleEditForm invisible" id="edit-form">
            Template: <br/>
            <input type="text" name="template" /><br/>
            Profile: <br/>
            <input type="text" name="profile"/><br/>
            Stamp: <br/>
            <input type="text" name="stamp"/><br/>
            Content: <br/>
            <input type="text" name="content"/>
          </form>

          <hr className="hr" />
        </main>
      </div>
    )
  }
}

export default StampPad
