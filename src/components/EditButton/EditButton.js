import React from 'react'

import { Button } from '../Button/Button'
import './EditButton.css'
import AddButton from '../AddButton/AddButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import Loader from '../Loader'

import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'

import SharedTemplates from '../SharedTemplates/SharedTemplates'

class EditButton extends React.Component {
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
    templateRowSelected: false,
    profileRowSelected: false,
    stampRowSelected: false,
    formTemplateTextBox: '',
    formProfileTextBox: '',
    formStampTextBox: '',
    formContentTextBox: '',
    order: '',
    selectStamps: true,
    isLoading: false,
  }

  templateSelect = (templateId) => {
    if (templateId === undefined) {
      this.reloadButtons()
    }
    this.setState({
      selectedTemplate: templateId,
    })
  }

  profileSelect = (profileId) => {
    if (profileId === undefined) {
      this.reloadButtons()
    }
    this.setState({
      selectedProfile: profileId,
    })
  }

  stampSelect = (stampId) => {
    this.setState({
      selectedStamp: stampId,
    })
  }

  triggerToggle = (e) => {
    this.reloadButtons()
    this.setState({
      triggerToggle: !this.state.triggerToggle,
    })
    this.setState({
      templateRowSelected: false,
      profileRowSelected: false,
      stampRowSelected: false,
    })
  }

  sliderTriggerToggle = (e) => {
    this.triggerToggle()
    if (e.target.checked) {
      this.setState({
        triggerToggle: false,
      })
    }
  }

  shareToggle = () => {
    this.setState({
      shareToggle: !this.state.shareToggle,
    })
  }

  templateSelectEdit = (id) => {
    this.setState({
      templateRowSelected: true,
      profileRowSelected: false,
      stampRowSelected: false,
      whatToEdit: 'template',
      target: id,
      formTemplateTextBox: id.title,
      formProfileTextBox: 'N/A',
      formStampTextBox: 'N/A',
      formContentTextBox: 'N/A',
    })
  }

  profileSelectEdit = (id) => {
    this.setState({
      whatToEdit: 'profile',
      target: id,
      templateRowSelected: false,
      profileRowSelected: true,
      stampRowSelected: false,
      templateTitle: id.title,
      formProfileTextBox: id.title,
      formStampTextBox: 'N/A',
      formContentTextBox: 'N/A',
    })

    const newArray = this.state.storeTemplate.filter(
      (template) => template.id === id.template_id
    )
    this.setState({
      formTemplateTextBox: newArray[0].title,
    })
  }

  stampSelectEdit = (id) => {
    this.setState({
      whatToEdit: 'stamp',
      target: id,
      templateRowSelected: false,
      profileRowSelected: false,
      stampRowSelected: true,
      formTemplateTextBox: 'N/A',
      formStampTextBox: id.title,
      formContentTextBox: id.content,
    })
    const newArray = this.state.storeProfile.filter(
      (profile) => profile.id === id.profile_id
    )
    this.setState({
      formProfileTextBox: newArray[0].title,
    })
  }

  saveConfiguration = (e) => {
    switch (this.state.whatToEdit) {
      case 'template':
        const newTemplateObj = {
          title: this.state.formTemplateTextBox,
        }
        const newTemplateArr = this.state.storeTemplate.filter(
          (template) => template.id === this.state.target.id
        )
        const newTemplateObj2 = newTemplateArr[0]
        const finalTemplateObj = {
          ...newTemplateObj2,
          ...newTemplateObj,
        }
        const arr2Template = [finalTemplateObj]
        const resTemplate = this.state.storeTemplate.map(
          (obj) => arr2Template.find((o) => o.id === obj.id) || obj
        )
        this.setState({
          storeTemplate: resTemplate,
        })
        if (finalTemplateObj.title !== '') {
          TemplateService.updateTemplate(finalTemplateObj)
        }
        break

      case 'profile':
        const selTemp = this.state.storeTemplate.find((temp) => {
          return temp.title === this.state.templateSelectedValue
        })
        const newProfileObj = {
          title: this.state.formProfileTextBox,
        }
        if (selTemp !== undefined) {
          newProfileObj.template_id = selTemp.id
        }
        const newProfileArr = this.state.storeProfile.filter(
          (profile) => profile.id === this.state.target.id
        )
        const newProfileObj2 = newProfileArr[0]
        const finalProfileObj = {
          ...newProfileObj2,
          ...newProfileObj,
        }
        const arr2Profile = [finalProfileObj]
        const resProfile = this.state.storeProfile.map(
          (obj) => arr2Profile.find((o) => o.id === obj.id) || obj
        )
        this.setState({
          storeProfile: resProfile,
        })
        if (finalProfileObj.title !== '') {
          ProfilesService.updateProfile(finalProfileObj)
        }
        break

      case 'stamp':
        const selStmp = this.state.storeProfile.filter((temp) => {
          return temp.title === this.state.profileSelectedValue
        })
        const newStampObj = {
          title: this.state.formStampTextBox,
          content: this.state.formContentTextBox,
          disp_ord: this.state.order,
        }
        if (selStmp[0] !== undefined) {
          newStampObj.profile = selStmp[0].id
        }
        const newStampArr = this.state.storeStamps.filter(
          (stamp) => stamp.id === this.state.target.id
        )
        const newStampObj2 = newStampArr[0]
        const finalStampObj = {
          ...newStampObj2,
          ...newStampObj,
        }
        const arr2Stamp = [finalStampObj]
        const resStamp = this.state.storeStamps.map(
          (obj) => arr2Stamp.find((o) => o.id === obj.id) || obj
        )
        this.setState({
          storeStamps: resStamp,
        })
        if (finalStampObj.title !== '') {
          StampsService.updateStamp(finalStampObj)
        }
        break

      default:
        console.log('Error in selection parameter')
    }

    this.triggerToggle()
    this.setState({
      templateRowSelected: true,
      profileRowSelected: true,
      stampRowSelected: true,
      target: '',
      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: '',
    })
    this.resetState()
  }

  handleAddDeleteButton = (type, arr) => {
    if (type === 'template') {
      this.setState({
        storeTemplate: arr,
      })
    }

    if (type === 'profile') {
      this.setState({
        storeProfile: arr,
      })
    }

    if (type === 'stamp') {
      this.setState({
        storeStamps: arr,
      })
    }

    this.setState({
      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: '',
    })
  }

  editProfileTemplateSelect = (e) => {
    if (e.target.value !== 'Select Template') {
      this.setState({
        templateSelectedValue: e.target.value,
        formTemplateTextBox: e.target.value,
      })
    }
  }

  editStampProfileSelect = (e) => {
    if (e.target.value !== 'Select Profile') {
      this.setState({
        profileSelectedValue: e.target.value,
        formProfileTextBox: e.target.value,
      })
    }
  }

  resetState = () => {
    this.setState({ requirementKey: Math.random() })
  }

  cancelConfiguration = () => {
    this.triggerToggle()
    this.setState({
      templateRowSelected: true,
      profileRowSelected: true,
      stampRowSelected: true,
      formTemplateTextBox: '',
      formProfileTextBox: '',
      formStampTextBox: '',
      formContentTextBox: '',
      target: '',
    })

    if (!this.state.triggerToggle) {
      this.resetState()
    }
  }

  renderTemplateOptions = () => {
    return this.state.storeTemplate.map((tmpl) => {
      return (
        <option key={tmpl.id} value={tmpl.title}>
          {tmpl.title}
        </option>
      )
    })
  }

  renderProfileOptions = () => {
    return this.state.storeProfile.map((prof) => {
      return (
        <option key={prof.id} value={prof.title}>
          {prof.title}
        </option>
      )
    })
  }

  templateBoxChange = (e) => {
    e.preventDefault()

    switch (this.state.whatToEdit) {
      case 'template':
        this.setState({
          formTemplateTextBox: e.target.value,
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
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formProfileTextBox
        break

      case 'profile':
        this.setState({
          formProfileTextBox: e.target.value,
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
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formStampTextBox
        break
      case 'profile':
        e.target.value = this.state.formStampTextBox
        break
      case 'stamp':
        this.setState({
          formStampTextBox: e.target.value,
        })
        break
      default:
        console.log('wrong selection in stampBoxChange')
    }
  }

  contentBoxChange = (e) => {
    switch (this.state.whatToEdit) {
      case 'template':
        e.target.value = this.state.formStampTextBox
        break

      case 'profile':
        e.target.value = this.state.formStampTextBox
        break

      case 'stamp':
        this.setState({
          formContentTextBox: e.target.value,
        })
        break

      default:
        console.log('wrong selection in contentBoxChange')
    }
  }

  componentDidMount() {
    // this.setState({ isLoading: true })
    // TemplateService.getTemplates((value) => {
    //   this.setState({ storeTemplate: value })
    //   this.setState({ isLoading: true })
    // }).catch((e) => {
    //   console.log('error->', e)
    //   this.setState({ isLoading: false })
    //   if (e.error === 'Unauthorized request') {
    //     localStorage.clear()
    //     this.props.history.push('/sign_in')
    //   }
    // })
    // ProfilesService.getProfiles((value) => {
    //   this.setState({ storeProfile: value })
    // })
    // StampsService.getStamps((value) => {
    //   this.setState({ storeStamps: value })
    // })
    // Promise.all([
    //   StampsService.getStamps(),
    //   ProfilesService.getProfiles(),
    //   TemplateService.getTemplates(),
    // ])
    //   .then((res) => {
    //     this.setState({ storeStamps: res[0] })
    //     this.setState({ storeProfile: res[1] })
    //     this.setState({ storeTemplate: res[2] })
    //     this.setState({
    //       isLoading: false,
    //     })
    //   })
    //   .catch((e) => {
    //     console.log('error->', e)
    //     this.setState({ isLoading: false })
    //     if (e.error === 'Unauthorized request') {
    //       localStorage.clear()
    //       this.props.history.push('/sign_in')
    //     }
    //   })
    this.reloadButtons()
  }

  reloadButtons = () => {
    this.setState({ isLoading: true })

    TemplateService.getTemplates((value) => {
      this.setState({ storeTemplate: value })
    })
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
    Promise.all([
      StampsService.getStamps(),
      ProfilesService.getProfiles(),
      TemplateService.getTemplates(),
    ])
      .then((res) => {
        this.setState({ storeStamps: res[0] })
        this.setState({ storeProfile: res[1] })
        this.setState({ storeTemplate: res[2] })
        this.setState({ isLoading: false })
      })
      .catch((e) => {
        console.log('error->', e)
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
          this.setState({ isLoading: false })
        }
      })
  }

  clickToggle = (e) => {
    if (e.target.checked) {
      this.setState({
        shareToggle: true,
      })
    } else {
      this.setState({
        shareToggle: false,
      })
    }
  }

  triggerShare = () => {
    this.shareToggle()
  }

  render() {
    const templateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id ? templ.id : i}
          onClick={() => this.templateSelect(templ.id)}
          template={this.state.selectedTemplate}
          className="template_button"
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
            className="profile_button"
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
            className="stamp_button"
          >
            {stamp.title}
          </Button>
        )
      })

    const templateRowEdit = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id ? templ.id : i}
          onClick={() => this.templateSelectEdit(templ)}
          template={this.state.selectedTemplate}
          buttonStyle="edit-stamp"
          className="template_button"
        >
          {this.state.storeTemplate[i].title}
        </Button>
      )
    })

    const profileRowEdit = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )
      .map((prof, i) => {
        return (
          <Button
            key={prof.id ? prof.id : i}
            onClick={() => this.profileSelectEdit(prof)}
            buttonStyle="edit-stamp"
            className="profile_button"
          >
            {prof.title}
          </Button>
        )
      })

    const stampRowEdit = this.state.storeStamps
      .filter((selected) => selected.profile_id === this.state.selectedProfile)
      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id ? stamp.id : i}
            onClick={() => this.stampSelectEdit(stamp)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            className="stamp_button"
            buttonStyle="edit-stamp"
          >
            {stamp.title}
          </Button>
        )
      })

    const addButtonForm = this.state.triggerToggle ? (
      <AddButton
        onAddButton={this.handleAddDeleteButton}
        selectedProfile={this.state.selectedProfile}
        selectedTemplate={this.state.selectedTemplate}
        onProfileSelect={this.profileSelect}
        onTemplateSelect={this.templateSelect}
        onUpdateTemplates={this.updateTemplates}
        buttonStyle="system"
      />
    ) : (
      ''
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
          <div>
            <div className="spacer" />
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="page-title">Configuration</h1>
                <p>
                  Use the slider on the right to toggle between editing custom
                  or shared stamps.
                </p>
                <div className="spacer" />
                <div className="holder">
                  <form action="#" className="customToggle">
                    <div className="row">
                      {this.state.shareToggle ? (
                        <span className="yes span-text black">My Stamps</span>
                      ) : (
                        <span className="yes span-text red">My Stamps</span>
                      )}
                      <span className="span-text">/</span>
                      {this.state.shareToggle ? (
                        <span className="yes span-text red">Shared Stamps</span>
                      ) : (
                        <span className="yes span-text black">
                          Shared Stamps
                        </span>
                      )}
                      <input
                        type="checkbox"
                        id="sharesToggle"
                        onClick={this.clickToggle}
                      />
                      <label
                        htmlFor="sharesToggle"
                        className="toggle-label"
                      ></label>
                    </div>
                  </form>
                </div>
              </>
            )}
            {!this.state.shareToggle ? (
              <div className="holder">
                <p>
                  To edit your custom stamps, first click on the stamps to
                  display what you want to edit, then click the toggle to enter
                  edit mode.
                </p>
                <form action="#" className="customToggle">
                  <div className="row">
                    {this.state.triggerToggle ? (
                      <span className="no span-text red">
                        Select Stamps To Edit
                      </span>
                    ) : (
                      <span className="no span-text black">
                        Select Stamps To Edit
                      </span>
                    )}
                    <span className="span-text">/</span>
                    {this.state.triggerToggle ? (
                      <span className="no span-text black">Edit Stamps</span>
                    ) : (
                      <span className="no span-text red">Edit Stamps</span>
                    )}
                    <input
                      type="checkbox"
                      id="toggle"
                      onClick={this.sliderTriggerToggle}
                    />
                    <label htmlFor="toggle" className="toggle-label"></label>
                  </div>
                </form>
              </div>
            ) : (
              ''
            )}
            <div className="spacer" />
            {!this.state.triggerToggle ? (
              <div style={{ display: 'flex' }} className="row">
                <Button
                  id="accept"
                  className="save-button"
                  onClick={() => this.saveConfiguration()}
                  buttonStyle="system"
                >
                  SUBMIT
                </Button>
                <Button
                  id="cancel"
                  className="save-button"
                  onClick={() => this.cancelConfiguration()}
                  buttonStyle="system"
                >
                  CANCEL EDIT
                </Button>
                <DeleteButton
                  onDeleteButton={this.handleAddDeleteButton}
                  target={this.state.target}
                  whatToEdit={this.state.whatToEdit}
                  storeTemplate={this.state.storeTemplate}
                  storeProfile={this.state.storeProfile}
                  storeStamps={this.state.storeStamps}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          {!this.state.shareToggle ? (
            <section>
              <div className="button-row template-row" id="button-row-template">
                <div className="spacer" />
                {this.state.triggerToggle ? templateRow : templateRowEdit}
                <div className="spacer" />
              </div>
              <hr className="hr" />
              <div className="button-row profile-row" id="button-row-profile">
                <div className="spacer" />
                {this.state.triggerToggle ? profileRow : profileRowEdit}
                <div className="spacer" />
              </div>
              <hr className="hr" />
              <div className="button-row stamp-row" id="button-row-stamps">
                <div className="spacer" />
                {this.state.triggerToggle ? stampRow : stampRowEdit}
                <div className="spacer" />
              </div>
              {!this.state.triggerToggle ? (
                <form className="form" id="edit-form">
                  Template: <br />
                  <input
                    type="text"
                    name="template"
                    id="templateTitle"
                    value={this.state.formTemplateTextBox}
                    onChange={(e) => this.templateBoxChange(e)}
                    className={
                      this.state.formTemplateTextBox !== 'N/A'
                        ? 'focus'
                        : 'disable-button'
                    }
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
                    className={
                      this.state.formProfileTextBox !== 'N/A'
                        ? 'focus'
                        : 'disable-button'
                    }
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
                    className={
                      this.state.formStampTextBox !== 'N/A'
                        ? 'focus'
                        : 'disable-button'
                    }
                  />
                  <br />
                  Content: <br />
                  <textarea
                    type="text"
                    name="content"
                    id="contentTitle"
                    value={this.state.formContentTextBox}
                    onChange={(e) => this.contentBoxChange(e)}
                    className={
                      this.state.formStampTextBox !== 'N/A'
                        ? 'focus'
                        : 'disable-button'
                    }
                  />
                </form>
              ) : (
                ''
              )}
              <hr className="hr" />
              <div>{addButtonForm}</div>
            </section>
          ) : (
            <div>
              <SharedTemplates />
            </div>
          )}
        </main>
      </div>
    )
  }
}

export default EditButton
