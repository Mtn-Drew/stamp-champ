import React from 'react'
// import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './Configure2.css'
import AddButtonProfile from '../AddButton/AddButtonProfile'
import AddButtonTemplate from '../AddButton/AddButtonTemplate'
import AddButtonStamp from '../AddButton/AddButtonStamp'

const placeholder = document.createElement('li')
placeholder.className = 'placeholder'
class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id,
    showAddProfileForm: false,
    showAddTemplateForm: false,
    showAddStampForm: false
  }

  copyToClipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
  }

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
  }



  onDragStart = (e, i) => {
    
    // this.draggedItem = this.state.store.load_out[i]
    e.dataTransfer.setData("text",e.target.className)
    let buttonType = e.dataTransfer.getData('text')
   
    if (buttonType === 'template_button') {
      this.draggedItem = this.state.store.template[i]
    } else {
      if (buttonType === 'profile_button') {
        this.draggedItem = this.state.store.load_out[i]
      } else {
        if (buttonType === 'stamps_button') {
          this.draggedItem = this.state.store.stamps[i]
        }
      }
    }
    console.log(e.dataTransfer.getData('text'))
    // console.log(this)
    // console.log('in onDragStart')
    console.log('draggedItem is ->')
    console.log(this.draggedItem)
    // console.log(e.dataTransfer.items)
    e.target.classList.add('hold')
    let etarget = e.target
    setTimeout(() => (etarget.className = 'invisible'), 0)
  }

  onDragEnter = (e) => {



     e.target.classList.add('hovered')
  }

  onDragLeave = (e) => {
    e.target.classList.remove('hovered')
  }

  
  onDragOver = (e, index) => {
    // console.log('in onDragOver')
    const draggedOverItem = this.state.store.load_out[index]
    // console.log('draggedOverItem is ->')
    // console.log(draggedOverItem)
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return
    }
    // console.log('still here onDragOver')
    // filter out the currently dragged item
    let items = this.state.store.load_out.filter(
      (item) => item !== this.draggedItem
    )
    console.log('items before splice ->')
    console.log(items)
    // console.log('index')
    // console.log(index)
    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem)

    console.log('items after splice');
    console.log(items);

    this.setState({
      store : {
        template : this.state.store.template,
        load_out: items,
        stamps : this.state.store.stamps
      }
    })
    // console.log('items-')
    // console.log(items)
  }

  onDragEnd = (e) => {
    // console.log('inDragEND')
    // console.log('draggedIdx->')
    // console.log(this.draggedIdx)
    this.draggedIdx = null
    // console.log('state ->')
    // console.log(this.state)
    e.target.className = '"configure_button"'
  }

  fnShowAddTemplateForm = () => {
    console.log('inShowAddTemplateForm')
    this.setState({
      showAddTemplateForm: true
    })
  }

  fnShowAddProfileForm = () => {
    console.log('in fnShowAddProfileForm')
    this.setState({ showAddProfileForm: true })
  }

  fnShowAddStampForm = () => {
    console.log('in fnShowAddStampForm')
    this.setState({
      showAddStampForm: true
    })
  }

  fnHideAddTemplateForm = () => {
    console.log('in fnHideAddTemplateForm')
    this.setState({ showAddTemplateForm: false })
  }

  fnHideAddProfileForm = () => {
    console.log('fnShowHideProfileForm')
    this.setState({ showAddProfileForm: false })
  }

  fnHideAddStampForm = () => {
    console.log('in fnHideAddStampForm')
    this.setState({
      showAddStampForm: false
    })
  }

  fnAddTemplateButton = (newObject) => {
    // called when clicked on 'save'
    // update state and post to db
    console.log('in fnAddTemplateButton')
  }

  fnAddProfileButton = (newObject) => {
    // called when clicked on "save" in AddButtonProfile
    // update state and post to db
    console.log('in fnAddProfileButton')
  }

  fnAddStampButton = (newObject) => {
    // called when clicked on save
    // update state and post to db
    console.log('in fnAddStampButton')
  }

  render() {
    // {this.props.changepage('stamps')}

    const templateRow = this.state.store.template.map((templ, i) => {
      return (
        <button
          key={templ.id}
          onClick={() => this.templateSelect(this.state.store.template[i].id)}
          template={this.state.selectedTemplate}
          draggable
          className="template_button"
          onDragStart={(e) => this.onDragStart(e, i)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e, i)}
            onDragEnter={(e) => this.onDragEnter(e)}
            onDragLeave={(e) => this.onDragLeave(e)}
        >
          {this.state.store.template[i].title}
        </button>
      )
    })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    const profileRow = this.state.store.load_out
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <button
            key={prof.id}
            onClick={() => this.profileSelect(prof.id)}
            // onMouseEnter={() => console.log('mouse')}
            draggable
            className="profile_button"
            onDragStart={(e) => this.onDragStart(e, i)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e, i)}
            onDragEnter={(e) => this.onDragEnter(e)}
            onDragLeave={(e) => this.onDragLeave(e)}
          >
            {prof.title}
          </button>
        )
      })
    // .sort((a, b) => (a.i > b.i ? -1 : 1))

    const stampRow = this.state.store.stamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.store.stamps[i].title}
            text={this.state.store.stamps[i].content}
            draggable
            className="stamps_button"
            onDragStart={(e) => this.onDragStart(e, i)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e, i)}
            onDragEnter={(e) => this.onDragEnter(e)}
            onDragLeave={(e) => this.onDragLeave(e)}
          >
            {stamp.title}
          </button>
        )
      })
    // .sort((a, b) => (a.order > b.order ? -1 : 1))

    return (
      <div style={{ height: '100%' }} className="mainPage">
        <main style={{ marginTop: '64px' }}>
          <h1>Configure Page2!!</h1>

          <div className="buttonRow">
            <div className="spacer" />
            {templateRow}
            <div className="spacer" />
            <button className="plus" onClick={this.fnShowAddTemplateForm}>
              <span role="img" aria-label="plus">
                ➕
              </span>
            </button>
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            <div className="spacer" />
            <div className="dragBox" onDragEnter={(e) => this.onDragEnter(e)}>
              ◀
            </div>
            {profileRow}
            <div
              className="dragBox"
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragLeave={(e) => this.onDragBoxLeave(e)}
            >
              ▶
            </div>
            <div className="spacer" />
            <button className="plus" onClick={this.fnShowAddProfileForm}>
              <span role="img" aria-label="plus">
                ➕
              </span>
            </button>
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            <div className="spacer" />
            {stampRow}
            <div className="spacer" />
            <button className="plus" onClick={this.fnShowAddStampForm}>
              <span role="img" aria-label="plus">
                ➕
              </span>
            </button>
          </div>

          <hr className="hr" />

          <div className="boxes">
            <div
              className="edit_box"
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragLeave={(e) => this.onDragLeave(e)}
            >
              <div> edit box</div>
            </div>
            <div className="spacer" />
            <div
              className="trash_box"
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragLeave={(e) => this.onDragLeave(e)}
            >
              <div>trash can</div>
            </div>
          </div>

          {this.state.showAddTemplateForm ? (
            <AddButtonTemplate
              handleClose={this.fnHideAddTemplateForm}
              save={this.fnAddTemplateButton}
              length={this.state.store.template.length}
            />
          ) : (
            <div></div>
          )}

          {this.state.showAddProfileForm ? (
            <AddButtonProfile
              handleClose={this.fnHideAddProfileForm}
              save={this.fnAddProfileButton}
              selectedTemplate={this.state.selectedTemplate}
              length={this.state.store.load_out.length}
            />
          ) : (
            <div></div>
          )}

          {this.state.showAddStampForm ? (
            <AddButtonStamp
              handleClose={this.fnHideAddStampForm}
              save={this.fnAddStampButton}
              selectedTemplate={this.state.selectedTemplate}
              selectedProfile={this.state.selectedProfile}
              length={this.state.store.stamps.length}
            />
          ) : (
            <div></div>
          )}
        </main>
      </div>
    )
  }
}

export default StampPad
