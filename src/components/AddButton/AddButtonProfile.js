import React from 'react'
// import STORE from '../../STORE'

class AddButtonProfile extends React.Component {
  saveButton = () => {
    
 //   const newTitle = getElementById('title').value
    const template = this.props.selectedTemplate
    const length = this.props.length

    const newObject = {"id" :"9",  //will be uuid
 //   "title": newTitle,  // value of input field below
    "template_id":template, // bring in current selected template as prop
    "order" : length+1} // add one to store.loud_out.length

    this.props.save(newObject)
// update database with post *****************

  }
  render() {
    return (
      <div>
        <section>
          <div>Add Profile Button</div>
    <p>Template: {this.props.selectedTemplate}</p>
          <input type="text" placeholder ='button title'/>
          <button onClick={this.saveButton}>Save</button>
          <button onClick={this.props.handleClose}>Cancel</button>
        </section>
      </div>
    )
  }
}

export default AddButtonProfile
