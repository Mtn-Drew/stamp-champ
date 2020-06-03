import React from 'react'
// import STORE from '../../STORE'

class AddButtonProfile extends React.Component {

  saveButton = () => {
  //  const template = this.props.selectedTemplate
    const profile = this.props.selectedProfile
    const length = this.props.length
  //  const content = getElementById('content').value
    const newObject = {
      id: '9', //will be uuid
 //     title: 'newTitle', // value of input field below
      loud_out_id: profile, // bring in current selected template as prop
  //    content: content,
      order: length +1
    } // add one to store.loud_out.length
    this.props.save(newObject)
    // update database with post *****************
  }

  render() {

    return (
      
      <div>
        <section>
          <div>Add Stamp Button</div>
          <p>Template: {this.props.selectedTemplate}</p>
          <p>Profile: {this.props.selectedProfile}</p>
          <input type="text" placeholder="button title" />
          <input id="content" type="text" placeholder="note text" />
          <button onClick={this.saveButton}>Save</button>
          <button onClick={this.props.handleClose}>Cancel</button>
        </section>
      </div>
    )
  }
}

export default AddButtonProfile
