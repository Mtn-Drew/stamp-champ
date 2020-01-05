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
    triggerToggle: true,
    whatToEdit: '',
    target: ''
  }

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
      triggerToggle: !this.state.triggerToggle
    })
    !this.state.triggerToggle
      ? document.getElementById('edit-form').classList.add('invisible')
      : document.getElementById('edit-form').classList.remove('invisible')
    console.log(this.state.triggerToggle)
  }

  templateSelectEdit = (id) => {
    this.setState({
      whatToEdit: 'template',
      target: id
    })
    console.log('in templateSelectEdit')
    console.log('selected template id->')
    console.log(this.state.selectedTemplate)
    console.log('what to edit')
    console.log(this.state.whatToEdit)

    // set state to template id
    // this.setState({
    //   selectedTemplate : id
    // })
    console.log(id)
    document.getElementById('templateTitle').value = id.title
    document.getElementById('profileTitle').value = 'N/A'
    document.getElementById('stampTitle').value = 'N/A'
    document.getElementById('contentTitle').value = 'N/A'
  }

  profileSelectEdit = (id) => {
    this.setState({ whatToEdit: 'profile', target: id })
    console.log('in profileSelectEdit')
    console.log('what to edit')
    console.log(this.state.whatToEdit)
    // this.setState({
    //   selectedProfile : id
    // })
    console.log(id)
    document.getElementById('templateTitle').value = id.template_id
    document.getElementById('profileTitle').value = id.title
    document.getElementById('stampTitle').value = 'N/A'
    document.getElementById('contentTitle').value = 'N/A'
  }

  stampSelectEdit = (id) => {
    this.setState({ whatToEdit: 'stamp', target: id })
    console.log('in stampSelectEdit')
    console.log('what to edit')
    console.log(this.state.whatToEdit)
    this.setState({ selectedStamp: id })
    document.getElementById('templateTitle').value = 'N/A'
    document.getElementById('profileTitle').value = id.load_out_id
    document.getElementById('stampTitle').value = id.title
    document.getElementById('contentTitle').value = id.content
  }

  saveConfiguration = () => {
    console.log('in saveConfiguration')
    console.log('what to edit ->')
    console.log(this.state.whatToEdit)

    switch (this.state.whatToEdit) {
      case 'template':
        const newTemplateObj = {title: document.getElementById('templateTitle').value}
        const newTemplateArr = this.state.storeTemplate.filter((template) => template.id === this.state.target.id)
        const newTemplateObj2 = newTemplateArr[0]
        // console.log('newObj');
        // console.log(newObj);
        // console.log('newArr');
        // console.log(newArr);
        // console.log('newObj2');
        // console.log(newObj2);
        const finalTemplateObj = {
          ...newTemplateObj2, ...newTemplateObj
        }
        // console.log('finalObj');
        // console.log(finalObj);
        const arr2Template = [finalTemplateObj]
        const resTemplate = this.state.storeTemplate.map(obj => arr2Template.find(o => o.id === obj.id) || obj);
        // console.log(res);
        this.setState({
          storeTemplate : resTemplate
        })
        // post to DB storeTemplate
        break;
      case 'profile':
        const newProfileObj = {title: document.getElementById('profileTitle').value, template_id : document.getElementById('templateTitle').value}
        
        const newProfileArr = this.state.storeProfile.filter((profile) => profile.id === this.state.target.id)
        const newProfileObj2 = newProfileArr[0]
        const finalProfileObj = {
          ...newProfileObj2, ...newProfileObj
        }
        const arr2Profile = [finalProfileObj]
        const resProfile = this.state.storeProfile.map(obj => arr2Profile.find(o => o.id === obj.id) || obj);
        console.log(resProfile);
        this.setState ({
          storeProfile : resProfile 
        })
        // post to DB storeTemplate
        break;
      case 'stamp':
        const newStampObj = {
          title: document.getElementById('stampTitle').value, 
          load_out_id : document.getElementById('profileTitle').value,
          content : document.getElementById('contentTitle').value
        }
        
        const newStampArr = this.state.storeStamps.filter((stamp) => stamp.id === this.state.target.id)
        const newStampObj2 = newStampArr[0]
        const finalStampObj = {
          ...newStampObj2, ...newStampObj
        }
        const arr2Stamp = [finalStampObj]
        const resStamp = this.state.storeStamps.map(obj => arr2Stamp.find(o => o.id === obj.id) || obj);
        console.log(resStamp);
        this.setState ({
          storeStamps : resStamp
        })
        // post to DB storeTemplate
        break;



    }
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
          onClick={() => this.templateSelectEdit(templ)} //change to storeTemplate?? *******************
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
            onClick={() => this.profileSelectEdit(prof)} //change to storeTemplate?? *******************
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
            onClick={() => this.stampSelectEdit(stamp)}
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
            <div className="spacer" />
            <h1>Edit Buttons!!</h1>
            <div className="spacer" />
            <button id="select-trigger" onClick={() => this.triggerToggle()}>
              {' '}
              SELECT{' '}
            </button>
            <div className="spacer" />
            <button
              className="save-button"
              onClick={() => this.saveConfiguration()}
            >
              SAVE
            </button>
            <div className="spacer" />
          </div>

          <div className="buttonRow" id="button-row-template">
            <div className="spacer" />
            {this.state.triggerToggle ? templateRow : templateRowEdit}
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
            Template: <br />
            <input type="text" name="template" id="templateTitle" />
            <br />
            Profile: <br />
            <input type="text" name="profile" id="profileTitle" />
            <br />
            Stamp: <br />
            <input type="text" name="stamp" id="stampTitle" />
            <br />
            Content: <br />
            <textarea type="text" name="content" id="contentTitle" />
          </form>

          <hr className="hr" />
        </main>
      </div>
    )
  }
}

export default StampPad
