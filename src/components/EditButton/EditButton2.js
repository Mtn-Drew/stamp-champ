import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './EditButton2.css'
import AddButton from '../AddButton/AddButton'
import DeleteButton from './DeleteButton'

// const placeholder = document.createElement('li')
// placeholder.className = 'placeholder'
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
    target: '',
    templateSelectedValue: '',
    templateRowSelected: true,
    profileRowSelected: true,
    stampRowSelected: true
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

    // if (!this.state.triggerToggle) {
    //    document.getElementById('edit-form').classList.add('invisible')
    //   document.getElementById('accept').classList.add('invisible')
    //   document.getElementById('cancel').classList.add('invisible')
    // } else {
    //    document.getElementById('edit-form').classList.remove('invisible')
    //   document.getElementById('accept').classList.remove('invisible')
    //   document.getElementById('cancel').classList.remove('invisible')
    // }
    console.log(this.state.triggerToggle)
  }
  //when template button is clicked during 'select'
  templateSelectEdit = (id) => {
  //   this.setState({
      
  //   })
    console.log('in templateSelectEdit')
    console.log('selected template id->')
    console.log(this.state.selectedTemplate)
    console.log('what to edit')
    console.log(this.state.whatToEdit)

    this.setState({
      templateRowSelected: true,
      profileRowSelected: false,
      stampRowSelected: false,
      whatToEdit: 'template',
      target: id,
      templateRowSelected: true
    })

    
    // document.getElementById('button-row-template').classList.remove('disable-button')
    // document.getElementById('button-row-profile').classList.add('disable-button')
    // document.getElementById('button-row-stamps').classList.add('disable-button')

    console.log(id)

    // document.getElementById('templateTitle').classList.remove('invisible')
    // document.getElementById('template-select2').classList.add('invisible')
    document.getElementById('templateTitle').value = id.title
    document.getElementById('profileTitle').value = 'N/A'
    document.getElementById('stampTitle').value = 'N/A'
    document.getElementById('contentTitle').value = 'N/A'
  }
  //when profile button is clicked during 'select'
  profileSelectEdit = (id) => {
    this.setState({ 
      whatToEdit: 'profile', 
      target: id, 
      templateRowSelected: false,
      profileRowSelected: true,
      stampRowSelected: false,
      templateTitle: id.title
      
    })
    console.log('in profileSelectEdit')
    console.log('what to edit')
    console.log(this.state.whatToEdit)
    console.log(id)
    // document
    //   .getElementById('button-row-template')
    //   .classList.add('disable-button')
    // document
    //   .getElementById('button-row-profile')
    //   .classList.remove('disable-button')
    // document.getElementById('button-row-stamps').classList.add('disable-button')
    document.getElementById('templateTitle').value = id.template_id
    const newArray = this.state.storeTemplate.filter(
      (template) => template.id === id.template_id
    )

    // document.getElementById('templateTitle').value = newArray[0].title
    // document.getElementById('profileTitle').value = id.title
    // document.getElementById('stampTitle').value = 'N/A'
    // document.getElementById('contentTitle').value = 'N/A'
  }
  // when stamp button is clicked during 'select'
  stampSelectEdit = (id) => {
    this.setState({ 
      whatToEdit: 'stamp', 
      target: id,
      templateRowSelected: false,
      profileRowSelected: false,
      stampRowSelected: true 
    })
    console.log('in stampSelectEdit')
    console.log('what to edit')
    console.log(this.state.whatToEdit)
    // document
    //   .getElementById('button-row-template')
    //   .classList.add('disable-button')
    // document
    //   .getElementById('button-row-profile')
    //   .classList.add('disable-button')
    // document
    //   .getElementById('button-row-stamps')
    //   .classList.remove('disable-button')
    // this.setState({ selectedStamp: id })
    document.getElementById('templateTitle').value = 'N/A'
    const newArray = this.state.storeProfile.filter(
      (profile) => profile.id === id.load_out_id
    )
    document.getElementById('profileTitle').value = newArray[0].title
    document.getElementById('stampTitle').value = id.title
    document.getElementById('contentTitle').value = id.content
  }

  // Save changes to state  
  saveConfiguration = () => {
    console.log('in saveConfiguration')
    console.log('what to edit ->')
    console.log(this.state.whatToEdit)

    //render elements
    // document.getElementById('button-row-template').classList.remove('disable-button')
    // document.getElementById('button-row-profile').classList.remove('disable-button')
    // document.getElementById('button-row-stamps').classList.remove('disable-button')

    switch (this.state.whatToEdit) {
      case 'template':
        //create new object with new title, then find old object, then replace old with new

        const newTemplateObj = {
          //get the value in template text box
          title: document.getElementById('templateTitle').value
        }
        // find the template we are changing
        const newTemplateArr = this.state.storeTemplate.filter(
          (template) => template.id === this.state.target.id
        )
        //can we just put newTemplateArr[0] in finalTemplateObj??
        const newTemplateObj2 = newTemplateArr[0]
          //merge
        const finalTemplateObj = {
          ...newTemplateObj2,
          ...newTemplateObj
        }
        //put new object in array, and swap with old object
        const arr2Template = [finalTemplateObj]
        const resTemplate = this.state.storeTemplate.map(
          (obj) => arr2Template.find((o) => o.id === obj.id) || obj
        )
        // replace old array with new array
        this.setState({
          storeTemplate: resTemplate
        })
        // post to DB storeTemplate
        break
      case 'profile':
        //find the template with the title selected in the dropdown to get the template.id
        const selTemp = this.state.storeTemplate.filter((temp) => {
          return (
            // temp.id === this.state.target.template_id
            temp.title === this.state.templateSelectedValue
          )
        })
        console.log('target')
        console.log(this.state.target)
        console.log(document.getElementById('template-select2').value)
        console.log('selTemp')
        console.log(selTemp)
        //assign new name and matching template id to new object
        if (
          document.getElementById('profileTitle').value === 'Select Template'
        ) {
          selTemp[0].id = this.state.target.template_id
        }
        const newProfileObj = {
          title: document.getElementById('profileTitle').value, // need to change
          //need validation; will crash if match isn't found
          template_id: selTemp[0].id
        }

        console.log('profile case')
        console.log(this.state.target)
        //filter all profile objects to get the profile we want to replace <use find instead??>
        const newProfileArr = this.state.storeProfile.filter(
          (profile) => profile.id === this.state.target.id
        )
        const newProfileObj2 = newProfileArr[0]
        const finalProfileObj = {
          ...newProfileObj2,
          ...newProfileObj
        }
        const arr2Profile = [finalProfileObj]
        const resProfile = this.state.storeProfile.map(
          (obj) => arr2Profile.find((o) => o.id === obj.id) || obj
        )
        console.log(resProfile)
        this.setState({
          storeProfile: resProfile
        })
        // post to DB storeTemplate
        break
      case 'stamp':
        console.log('in STAMP')
        console.log('target?')
        console.log(this.state.target)
        const selTemp2 = this.state.storeProfile.filter((temp) => {
          return temp.id === this.state.target.id
        })
        console.log(document.getElementById('profile-select2').value)
        console.log('selTemp2')
        console.log(selTemp2)
        const newStampObj = {
          title: document.getElementById('stampTitle').value,
          load_out_id: selTemp2[0].id,
          content: document.getElementById('contentTitle').value
        }

        const newStampArr = this.state.storeStamps.filter(
          (stamp) => stamp.id === this.state.target.id
        )
        const newStampObj2 = newStampArr[0]
        const finalStampObj = {
          ...newStampObj2,
          ...newStampObj
        }
        const arr2Stamp = [finalStampObj]
        const resStamp = this.state.storeStamps.map(
          (obj) => arr2Stamp.find((o) => o.id === obj.id) || obj
        )
        console.log(resStamp)
        this.setState({
          storeStamps: resStamp
        })
        // post to DB storeTemplate
        break
      default:
        console.log('selection error eb2')
    }
    this.triggerToggle()
    this.resetState()
  }

  handleAddDeleteButton = (type, arr) => {
    console.log('in handleAddDeleteButton')
    console.log(type, arr)
    if (type === 'template') {
      this.setState({
        storeTemplate: arr
      })
    }
    if (type === 'profile') {
      this.setState({
        storeProfile: arr
      })
    }
    if (type === 'stamp') {
      this.setState({
        storeStamps: arr
      })
    }
  }

  toggleTemplateTitle = (e) => {
    console.log('in toggleTemplateTitle')
    console.log('e.target')
    console.log(e.target)
  }

  editProfileTemplateSelect = (e) => {
    console.log('in editProfileTemplateSelect')
    console.log('e.target')
    console.log(e.target)
    console.log('e.target.value')
    console.log(e.target.value)
    this.setState({
      templateSelectedValue: e.target.value
    })
  }

  resetState = () => {
    //trigger re-render
    this.setState({ requirementKey: Math.random() })
  }

  cancelConfiguration = () => {
    console.log('in cancelConfiguration')
    this.triggerToggle()
    this.setState({
      templateRowSelected: true,
    profileRowSelected: true,
    stampRowSelected: true
    })
    // document
    //   .getElementById('button-row-template')
    //   .classList.remove('disable-button')
    // document
    //   .getElementById('button-row-profile')
    //   .classList.remove('disable-button')
    // document
    //   .getElementById('button-row-stamps')
    //   .classList.remove('disable-button')
    if (!this.state.triggerToggle) {
      this.resetState()
    }
  }

  //maps through template array to populate dropdown
  renderTemplateOptions = () => {
    return this.state.storeTemplate.map((tmpl) => {
      // let select = ''
      console.log('in renderTemplateOptions')
      console.log(tmpl.id)
      console.log(this.state.target.template_id)
      // if (tmpl.id === this.state.target.template_id) {
      //   select = 'selected'
      // }
      return (
        // <option key={tmpl.id} value={tmpl.title} selected={select}>
        <option key={tmpl.id} value={tmpl.title}>
          {tmpl.title}
        </option>
      )
    })
  }

  //maps through profile array to populate dropdown
  renderProfileOptions = () => {
    return this.state.storeProfile.map((prof) => {
      // let select = ''
      console.log('in renderProfileOptions')
      console.log(prof.id)
      console.log(this.state.target.load_out_id)
      // if (tmpl.id === this.state.target.template_id) {
      //   select = 'selected'
      // }
      return (
        // <option key={tmpl.id} value={tmpl.title} selected={select}>
        <option key={prof.id} value={prof.title}>
          {prof.title}
        </option>
      )
    })
  }

  render() {
    // {this.props.changepage('stamps')}
    console.log(this.state.triggerToggle);


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

    const addButtonForm = this.state.triggerToggle ? (
      <AddButton onAddButton={this.handleAddDeleteButton} />
    ) : (
      <DeleteButton
        onDeleteButton={this.handleAddDeleteButton}
        target={this.state.target.title}
        whatToEdit={this.state.whatToEdit}
      />
    )

    const profileDefaultValue = this.state.storeTemplate.find(
      (t) => t.id === this.state.target.title
    )
    const stampDefaultValue = this.state.storeProfile.find(
      (p) => p.id === this.state.target.title
    )

    return (
      <div style={{ height: '100%' }} className="mainPage ">
        <main style={{ marginTop: '64px' }} key={this.state.requirementKey}>
          <div style={{ display: 'flex' }}>
            <div className="spacer" />
            <h1>Edit Buttons!!</h1>
            <div className="spacer" />
            <button id="select-trigger" onClick={() => this.triggerToggle()}>
              {' '}
              SELECT{' '}
            </button>
            <div className="spacer" />

            {!this.state.triggerToggle ? (
            <>
            <button
              id="accept"
              className="save-button"
              onClick={() => this.saveConfiguration()}
            >
              ACCEPT
            </button>

            <div className="spacer" />

            <button
              id="cancel"
              className="save-button"
              onClick={() => this.cancelConfiguration()}
            >
              CANCEL
            </button>

            <div className="spacer" />
            </>) : ''}
          </div>

          <div className={this.state.templateRowSelected ? "buttonRow":"disable-button buttonRow"} id="button-row-template">
            <div className="spacer" />
            {this.state.triggerToggle ? templateRow : templateRowEdit}
            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div className={this.state.profileRowSelected ? "buttonRow":"disable-button buttonRow"} id="button-row-profile">
            <div className="spacer" />

            {this.state.triggerToggle ? profileRow : profileRowEdit}

            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div className={this.state.stampRowSelected ? "buttonRow":"disable-button buttonRow"} id="button-row-stamps">
            <div className="spacer" />
            {this.state.triggerToggle ? stampRow : stampRowEdit}
            <div className="spacer" />
          </div>

           {!this.state.triggerToggle ? (<form className="toggleEditForm" id="edit-form"> 
          {/* <form className="toggleEditForm invisible" id="edit-form"> */}
            Template: <br />
            <input
              type="text"
              name="template"
              id="templateTitle"
              onClick={(e) => this.toggleTemplateTitle(e)}
              defaultValue={this.state.templateTitle}
            />
            {this.state.whatToEdit === 'profile' ? (
              <select
                name="template-selection"
                id="template-select2"
                onChange={(e) => this.editProfileTemplateSelect(e)}
                defaultValue={profileDefaultValue}
              >
                <option
                  value="Select Template"
                  name="default"
                  id="template_default_option"
                >
                  Select Template
                </option>
                {this.renderTemplateOptions()}
              </select>
            ) : (
              ''
            )}
            <br />
            Profile: <br />
            <input type="text" name="profile" id="profileTitle" />
            {this.state.whatToEdit === 'stamp' ? (
              <select
                name="profile-selection"
                id="profile-select2"
                onChange={(e) => this.editProfileTemplateSelect(e)}
                defaultValue={stampDefaultValue}
              >
                <option
                  value="Select Profile"
                  name="default"
                  id="profile_default_option"
                >
                  Select Profile
                </option>
                {this.renderProfileOptions()}
              </select>
            ) : (
              ''
            )}
            <br />
            Stamp: <br />
            <input type="text" name="stamp" id="stampTitle" />
            <br />
            Content: <br />
            <textarea type="text" name="content" id="contentTitle" />
          </form>) : ''}
          {/* </form> */}


          <hr className="hr" />
          {addButtonForm}
        </main>
      </div>
    )
  }
}

export default StampPad
