import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'
import './Configure2.css'

class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id
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
      this.draggedItem = this.state.store.load_out[i];
    e.dataTransfer.effectAllowed = 'move'
    // e.dataTransfer.setData("text/html", e.target.parentNode);
    // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    console.log(this.draggedItem);
  }

  onDragOver = (index) => {
    console.log('in onDragOver');
    const draggedOverItem = this.state.store.load_out[index]

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return
    }
console.log('still here onDragOver');
    // filter out the currently dragged item
    let items = this.state.store.load_out.filter((item) => item !== this.draggedItem)

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem)

    this.setState({ 
      load_out : items
    })
    console.log('items-')
    console.log(items);
  }

  onDragEnd = () => {
    console.log(this.draggedIdx)
    this.draggedIdx = null
    console.log('inDragEND')
    console.log(this.state);
    
  }

  render() {
    // {this.props.changepage('stamps')}

    const templateRow = this.state.store.template
      .map((templ, i) => {
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
      .sort((a, b) => (a.order > b.order ? -1 : 1))

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
            onDragEnd={this.onDragEnd}
            onDragOver={() => this.onDragOver(i)}
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
          >
            {stamp.title}
          </button>
        )
      })
      .sort((a, b) => (a.order > b.order ? -1 : 1))

    return (
      <div style={{ height: '100%' }}>
        <main style={{ marginTop: '64px' }}>
          <h1>Configure Page2!!</h1>

          <div className="buttonRow">
            {templateRow}
            <div className="spacer" />
            <div className="plus" onClick={this.addTemplateButton}>
              ➕
            </div>
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            {profileRow}
            <div className="spacer" />
            <div className="plus" onClick={this.addProfileButton}>
              ➕
            </div>
          </div>

          <hr className="hr" />

          <div className="buttonRow">
            {stampRow}
            <div className="spacer" />
            <div className="plus" onClick={this.addStampButton}>
              ➕
            </div>
          </div>

          <hr className="hr" />

          <div className="boxes">
            <div className="edit_box">edit box</div>
            <div className="trash_box">trash can</div>
          </div>

        </main>
      </div>
    )
  }
}

export default StampPad
