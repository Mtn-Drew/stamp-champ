import React from 'react'
import { Button } from '../Button/Button'
// import STORE from '../../STORE'
import './EditButton.css'
import AddButton from '../AddButton/AddButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'

import SharedTemplates from '../SharedTemplates/SharedTemplates'
import ShareableTemplates from '../ShareableTemplates/ShareableTemplates'

class StampPad extends React.Component {
  state = {
    selectedTemplate: {},
    selectedProfile: {},
    storeTemplate: [],
    storeProfile: [],
    storeStamps: [],
    showAddProfileForm: false,
    showAddTemplateForm: false,
    showAddStampForm: false,
    triggerToggle: true,
    shareToggle: false,
    whatToEdit: '',
    target: '',
    templateSelectedValue: '',
    templateRowSelected: true,
    profileRowSelected: true,
    stampRowSelected: true,
    formTemplateTextBox: '',
    formProfileTextBox: '',
    formStampTextBox: '',
    formContentTextBox: '',
    order: ''
  }

  //handle templateSelect
  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
    console.log('in templateSelect')
    console.log('this.state.selectedTemplate')
    console.log(this.state.selectedTemplate)
    console.log('templateID', templateId)
  }

  //handle profileSelect
  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
    console.log('in profileSelect')
  }

  //handle stampSelect
  stampSelect = (stampId) => {
    this.setState({
      selectedStamp: stampId
    })
    console.log('in stampSelect')
  }

  //toggle editable
  triggerToggle = () => {
    console.log('in triggerToggle')
    this.setState({
      triggerToggle: !this.state.triggerToggle
    })
    this.reloadButtons()
    console.log(this.state.triggerToggle)
  }

  shareToggle = () =>{
    this.setState({
      shareToggle: !this.state.shareToggle
    })
  }

  //when template button is clicked during 'select'
  templateSelectEdit = (id) => {
    console.log('in templateSelectEdit')
    console.log('id->', id)

    this.setState({
      templateRowSelected: true,
      profileRowSelected: false,
      stampRowSelected: false,
      whatToEdit: 'template',
      target: id,
      formTemplateTextBox: id.title,
      formProfileTextBox: 'N/A',
      formStampTextBox: 'N/A',
      formContentTextBox: 'N/A'
    })
  }

  //when profile button is clicked during 'select'
  profileSelectEdit = (id) => {
    console.log('in profileSelectEdit')
    console.log('id->', id)
    this.setState({
      whatToEdit: 'profile',
      target: id,
      templateRowSelected: false,
      profileRowSelected: true,
      stampRowSelected: false,
      templateTitle: id.title,
      formProfileTextBox: id.title,
      formStampTextBox: 'N/A',
      formContentTextBox: 'N/A'
    })

    const newArray = this.state.storeTemplate.filter(
      (template) => template.id === id.template_id
    )
    this.setState({
      formTemplateTextBox: newArray[0].title
    })
  }

  // when stamp button is clicked during 'select'
  stampSelectEdit = (id) => {
    console.log('in stampSelectEdit')
    this.setState({
      whatToEdit: 'stamp',
      target: id,
      templateRowSelected: false,
      profileRowSelected: false,
      stampRowSelected: true,
      formTemplateTextBox: 'N/A',
      formStampTextBox: id.title,
      formContentTextBox: id.content
    })
    const newArray = this.state.storeProfile.filter(
      (profile) => profile.id === id.profile_id
    )
    this.setState({
      formProfileTextBox: newArray[0].title
    })
  }

  // Save changes to state
  saveConfiguration = (e) => {
    console.log('in saveConfiguration')

    switch (this.state.whatToEdit) {
      case 'template':
        //create new object with new title, then find old object, then replace old with new
        const newTemplateObj = {
          //get the value in template text box
          title: this.state.formTemplateTextBox
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
        console.log('target->', this.state.target)
        // const tmpl = this.state.target
        if (finalTemplateObj.title !== '') {
          console.log('call update template')
          TemplateService.updateTemplate(finalTemplateObj)
        }
        //reload??
        break

      case 'profile':
        //find the template with the title selected in the dropdown to get the template.id
        const selTemp = this.state.storeTemplate.find((temp) => {
          return (
            // temp.id === this.state.target.template_id
            temp.title === this.state.templateSelectedValue
          )
        })

        const newProfileObj = {
          // title: document.getElementById('profileTitle').value,
          title: this.state.formProfileTextBox
          //need validation; will crash if match isn't found
          // template_id: this.state.target.id
        }

        if (selTemp !== undefined) {
          newProfileObj.template_id = selTemp.id
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
        console.log('target->', this.state.target)
        // post to DB storeTemplate
        if (finalProfileObj.title !== '') {
          console.log('call update profile')
          ProfilesService.updateProfile(finalProfileObj)
        }
        break

      case 'stamp':
        console.log('in STAMP')
        console.log('target?')
        console.log(this.state.target)
        // find the profile in store array where the title matches the formbox
        const selStmp = this.state.storeProfile.filter((temp) => {
          return temp.title === this.state.profileSelectedValue
        })

        console.log('selStmp')
        console.log(selStmp)
        const newStampObj = {
          title: this.state.formStampTextBox,
          content: this.state.formContentTextBox,
          disp_ord: this.state.order
        }
        console.log('newStampObj', newStampObj)
        if (selStmp[0] !== undefined) {
          newStampObj.profile = selStmp[0].id
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
        console.log('target->', this.state.target)
        // post to DB storeTemplate
        if (finalStampObj.title !== '') {
          console.log('call update stamps')
          StampsService.updateStamp(finalStampObj)
        }
        break
      default:
        console.log('selection error eb2')
    }
    this.triggerToggle()
    //reset selectable rows
    this.setState({
      templateRowSelected: true,
      profileRowSelected: true,
      stampRowSelected: true,
      target: '',
      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: ''
    })
    this.resetState()
  }

  handleAddDeleteButton = (type, arr) => {
    console.log('in handleAddDeleteButton')
    console.log(type, arr)
    if (type === 'template') {
      //???????????????????????????????????????????????????????
      this.setState({
        storeTemplate: arr
      })
    }
    if (type === 'profile') {
      const temp = this.state.storeProfile
      console.log('temp', temp)
      //temp.push(arr[arr.length - 1]) // for loading the latest added item into state
      console.log('newTemp', temp)
      this.setState({
        storeProfile: arr
      })
    }

    if (type === 'stamp') {
      this.setState({
        storeStamps: arr
      })
    }

    //clear form
    this.setState({
      //force re-render?
      //storeTemplate: arr,

      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: ''
    })
  }

  toggleTemplateTitle = (e) => {
    console.log('in toggleTemplateTitle')
  }

  editProfileTemplateSelect = (e) => {
    console.log('in editProfileTemplateSelect')
    if (e.target.value !== 'Select Template') {
      this.setState({
        templateSelectedValue: e.target.value,
        formTemplateTextBox: e.target.value
      })
    }
  }

  editStampProfileSelect = (e) => {
    console.log('in editStampProfileSelect')

    if (e.target.value !== 'Select Profile') {
      this.setState({
        profileSelectedValue: e.target.value,
        formProfileTextBox: e.target.value
      })
    }
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
      stampRowSelected: true,
      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: '',
      target: ''
    })

    if (!this.state.triggerToggle) {
      this.resetState()
    }
  }

  //maps through template array to populate dropdown
  renderTemplateOptions = () => {
    console.log('in renderTemplateOptions')
    return this.state.storeTemplate.map((tmpl) => {
      // let select = ''

      return (
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

      return (
        <option key={prof.id} value={prof.title}>
          {prof.title}
        </option>
      )
    })
  }

  templateBoxChange = (e) => {
    console.log('in templateBoxChange')
    e.preventDefault()

    switch (this.state.whatToEdit) {
      case 'template':
        this.setState({
          formTemplateTextBox: e.target.value
        })
        break
      case 'profile':
        e.target.value = this.state.formTemplateTextBox
        break
      case 'stamp':
        e.target.value = this.state.formTemplateTextBox
        break
      default:
        console.log('wrong selection in templateBoxChange')
    }
  }

  profileBoxChange = (e) => {
    console.log('in profileBoxChange')
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formProfileTextBox
        break
      case 'profile':
        this.setState({
          formProfileTextBox: e.target.value
        })
        break
      case 'stamp':
        e.target.value = this.state.formProfileTextBox
        break
      default:
        console.log('wrong selection in profileBoxChange')
    }
  }

  stampBoxChange = (e) => {
    console.log('in stampBoxChange')
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formStampTextBox
        break
      case 'profile':
        e.target.value = this.state.formStampTextBox

        break
      case 'stamp':
        this.setState({
          formStampTextBox: e.target.value
        })
        break
      default:
        console.log('wrong selection in stampBoxChange')
    }
  }

  contentBoxChange = (e) => {
    console.log('in contentBoxChange')
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formStampTextBox
        break
      case 'profile':
        e.target.value = this.state.formStampTextBox

        break
      case 'stamp':
        this.setState({
          formContentTextBox: e.target.value
        })
        break
      default:
        console.log('wrong selection in contentBoxChange')
    }
  }

  componentDidMount() {
    console.log(
      'componentDidMount----------------------------------------------------------------'
    )
    TemplateService.getTemplates((value) => {
      this.setState({ storeTemplate: value })
    }).catch((e) => {
      console.log('error->', e)
      if (e.error === 'Unauthorized request') {
        localStorage.clear()
        this.props.history.push('/sign_in')
      }
    })
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
    //ShareService.getShares((value) => {
    // this.setState({ storeShares: value })
    //})

    Promise.all([
      //ShareService.getShares(),
      StampsService.getStamps(),
      ProfilesService.getProfiles(),
      TemplateService.getTemplates()
    ])
      .then((res) => {
        //this.setState({ storeShares: res[0] })
        this.setState({ storeStamps: res[0] })
        this.setState({ storeProfile: res[1] })
        this.setState({ storeTemplate: res[2] })
        //this.loadShares()
      })
      .catch((e) => {
        console.log('error->', e)
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })

    //this.reloadButtons()
  }

  reloadButtons = () => {
    console.log('in reloadButtons')
    console.log(this.state.storeTemplate)
    console.log(this.state.storeProfile)
    console.log(this.state.storeStamps)
    TemplateService.getTemplates((value) => {
      this.setState({ storeTemplate: value })
    })
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
  }

  handleProfileSelect = (select) => {
    this.setState({
      selectedProfile: select
    })
  }

  handleTemplateSelect = (select) => {
    this.setState({
      selectedTemplate: select
    })
  }

  moveUp = () => {
    console.log('in moveUp')
    console.log(this.state.target)
    console.log(this.state.target.disp_ord)
    // if (this.state.target) {
    //   this.state.order = 0
    // }
    // if (this.state.whatToEdit==='stamps') {
    //   this.setState({
    //     target:
    //   })
    // }
  }

  moveDown = () => {
    console.log('in moveDown')
  }

  triggerShare = () => {
    console.log('in triggerShare')
    this.shareToggle()
  }

  render() {
    console.log('RENDER RENDER')
    console.log(this.state.triggerToggle)
    console.log(this.state.storeTemplate)
    console.log(this.state.storeProfile)
    console.log(this.state.storeStamps)

    const templateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id ? templ.id : i}
          onClick={() => this.templateSelect(templ.id)}
          template={this.state.selectedTemplate}
          className="template_button edit-select btn--edit--solid" //how to overwrite css??
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
            key={prof.id ? prof.id : i}
            onClick={() => this.profileSelect(prof.id)}
            // onMouseEnter={() => console.log('mouse')}

            className="profile_button "
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
            key={stamp.id ? stamp.id : i}
            onClick={() => this.stampSelect(stamp.id)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            className="stamps_button"
          >
            {stamp.title}
          </Button>
        )
      })

    const templateRowEdit = this.state.storeTemplate.map((templ, i) => {
      return (
        <button
          key={templ.id ? templ.id : i}
          onClick={() => this.templateSelectEdit(templ)}
          template={this.state.selectedTemplate}
          className="template_button edit-select"
        >
          {this.state.storeTemplate[i].title}
        </button>
      )
    })

    const profileRowEdit = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <button
            key={prof.id ? prof.id : i}
            onClick={() => this.profileSelectEdit(prof)}
            // onMouseEnter={() => console.log('mouse')}

            className="profile_button edit-select"
          >
            {prof.title}
          </button>
        )
      })

    const stampRowEdit = this.state.storeStamps
      .filter((selected) => selected.profile_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <button
            key={stamp.id ? stamp.id : i}
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
      <AddButton
        onAddButton={this.handleAddDeleteButton}
        selectedProfile={this.state.selectedProfile}
        selectedTemplate={this.state.selectedTemplate}
        onProfileSelect={this.handleProfileSelect}
        onTemplateSelect={this.templateSelect}
        // owner={this.state.user.id}
      />
    ) : (
      <DeleteButton
        onDeleteButton={this.handleAddDeleteButton}
        target={this.state.target}
        whatToEdit={this.state.whatToEdit}
        storeTemplate={this.state.storeTemplate}
        storeProfile={this.state.storeProfile}
        storeStamps={this.state.storeStamps}
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
              TOGGLE EDIT MODE{' '}
            </button>
            {/* <button id="select-share" onClick={() => this.triggerShare()}>
              {' '}
              SHARED TEMPLATES{' '}
            </button> */}
            <div className="spacer" />

            {!this.state.triggerToggle ? (
              <>
                <button
                  id="accept"
                  className="save-button"
                  onClick={() => this.saveConfiguration()}
                >
                  SUBMIT
                </button>

                <div className="spacer" />

                <button
                  id="cancel"
                  className="save-button"
                  onClick={() => this.cancelConfiguration()}
                >
                  CANCEL EDIT {this.state.whatToEdit}
                </button>

                <div className="spacer" />
              </>
            ) : (
              <button id="select-share" onClick={() => this.triggerShare()}>
                {' '}
                SHARED TEMPLATES{' '}
              </button>
            )}
          </div>

{/* main body */}
              {!this.state.shareToggle ? (

        <section>

          <div
            className={
              this.state.templateRowSelected
                ? 'buttonRow'
                : 'disable-button buttonRow'
            }
            id="button-row-template"
          >
            <div className="spacer" />
            {this.state.triggerToggle ? templateRow : templateRowEdit}
            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div
            className={
              this.state.profileRowSelected
                ? 'buttonRow'
                : 'disable-button buttonRow'
            }
            id="button-row-profile"
          >
            <div className="spacer" />

            {this.state.triggerToggle ? profileRow : profileRowEdit}

            <div className="spacer" />
          </div>

          <hr className="hr" />

          <div
            className={
              this.state.stampRowSelected
                ? 'buttonRow'
                : 'disable-button buttonRow'
            }
            id="button-row-stamps"
          >
            <div className="spacer" />
            {this.state.triggerToggle ? stampRow : stampRowEdit}
            <div className="spacer" />
          </div>

          {!this.state.triggerToggle ? (
            <form className="toggleEditForm" id="edit-form">
              Template: <br />
              <input
                type="text"
                name="template"
                id="templateTitle"
                // onClick={(e) => this.toggleTemplateTitle(e)}
                value={this.state.formTemplateTextBox}
                onChange={(e) => this.templateBoxChange(e)}
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
              <input
                type="text"
                name="profile"
                id="profileTitle"
                value={this.state.formProfileTextBox}
                onChange={(e) => this.profileBoxChange(e)}
              />
              {this.state.whatToEdit === 'stamp' ? (
                <select
                  name="profile-selection"
                  id="profile-select2"
                  onChange={(e) => this.editStampProfileSelect(e)}
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
              <input
                type="text"
                name="stamp"
                id="stampTitle"
                value={this.state.formStampTextBox}
                onChange={(e) => this.stampBoxChange(e)}
              />
              <br />
              Content: <br />
              <textarea
                type="text"
                name="content"
                id="contentTitle"
                value={this.state.formContentTextBox}
                onChange={(e) => this.contentBoxChange(e)}
              />
            </form>
          ) : (
            ''
          )}

          <hr className="hr" />
          <div>
            {addButtonForm}
            {/* {this.state.triggerToggle ? null : (
              <div>
                <button onClick={this.moveUp}>Move Up</button>
                <button onClick={this.moveDown}>Move Down</button>
              </div>
            )} */}
          </div>
          </section>
          ) : (
            <div>
            <SharedTemplates/>
            
            <ShareableTemplates/>
          </div>
          )}
         
        </main>
      </div>
    )
  }
}

export default StampPad
