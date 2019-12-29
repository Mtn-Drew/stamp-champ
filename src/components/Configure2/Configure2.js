import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './Configure2.css'
import AddButtonProfile from '../AddButton/AddButtonProfile'

class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id,
    showAddProfileModal : false,
    showAddTemplateModal : false,
    showAddStampModal: false
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

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
  }

  onDragStart = (e, i) => {
    this.draggedItem = this.state.store.load_out[i]

    console.log(this)
    console.log('in onDragStart')
    console.log('draggedItem is ->')
    console.log(this.draggedItem)
    e.target.className += ' hold'
    let etarget = e.target
    setTimeout(() => (etarget.className = 'invisible'), 0)

    // e.dataTransfer.effectAllowed = 'move'
  }

  onDragEnter = (e) => {
    e.target.className += ' hovered'
  }

  onDragLeave = (e) => {
    e.target.className = 'configure_button'
  }

  onDragBoxLeave = (e) => {
    e.target.className = 'dragBox'
  }

  onDragContainerLeave = (e) => {
    e.target.className = 'edit_box'
  }
  onDragContainerEnter = (e) => {
    e.target.className += ' box_hovered'
  }

  onDragOver = (e, index) => {
    console.log('in onDragOver')
    const draggedOverItem = this.state.store.load_out[index]
    console.log('draggedOverItem is ->')
    console.log(draggedOverItem)

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return
    }
    console.log('still here onDragOver')
    // filter out the currently dragged item
    let items = this.state.store.load_out.filter(
      (item) => item !== this.draggedItem
    )
    console.log('items before splice ->')
    console.log(items)
    console.log('index')
    console.log(index)
    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem)

    // this.setState({
    //   store : {
    //     template : this.state.store.template,
    //     loud_out: items,
    //     stamps : this.state.store.stamps
    //   }
    // })

    console.log('items-')
    console.log(items)
  }

  onDragEnd = (e) => {
    console.log('inDragEND')
    console.log('draggedIdx->')
    console.log(this.draggedIdx)
    this.draggedIdx = null
    console.log('state ->')
    console.log(this.state)
    e.target.className = '"configure_button"'
  }



  fnShowAddProfileModal = () =>{
    console.log('fnShowAddProfileModal');
    this.setState({showAddProfileModal : true})
  }
  fnHideAddProfileModal = () => {
    console.log('fnShowHideProfileModal');
    this.setState({showAddProfileModal:false})
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
          className="configure_button"
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
            className="configure_button"
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
            className="configure_button"
            onDragStart={(e) => this.onDragStart(e, i)}
            onDragEnd={this.onDragEnd}
            className="fill"
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
            <div className="plus" onClick={this.addTemplateButton}>
              ➕
            </div>
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
            <div className="plus" onClick={this.fnShowAddProfileModal}>
              ➕
            </div>
          </div>

          <hr className="hr" />

          <div className="buttonRow">
          <div className="spacer" />
            {stampRow}
            <div className="spacer" />
            <div className="plus" onClick={this.addStampButton}>
              ➕
            </div>
          </div>

          <hr className="hr" />

          <div className="boxes">
            <div
              className="edit_box"
              onDragEnter={(e) => this.onDragContainerEnter(e)}
              onDragLeave={(e) => this.onDragContainerLeave(e)}
            >
              <div> edit box</div>
            </div>
            <div className="spacer" />
            <div
              className="trash_box"
              onDragEnter={(e) => this.onDragContainerEnter(e)}
              onDragLeave={(e) => this.onDragContainerLeave(e)}
            >
              <div>trash can</div>
            </div>
          </div>
          <AddButtonProfile show={this.state.showAddProfileModal} handleClose={this.fnHideAddProfileModal} />
        </main>
      </div>
    )
  }
}

export default StampPad
