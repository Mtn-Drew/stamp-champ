import React from 'react'
// import STORE from '../../STORE'

class AddButtonTemplate extends React.Component {
  saveButton = () => {
    
    
  //  const title = getElementById('title').value
    const length = this.props.length

    const newObject = {
      "id" :"9",  //will be uuid
 //     "title": title,  // value of input field below
      "order" : length+1} // add one to store.loud_out.length

      this.props.save(newObject)
// update database with post *****************

  }
  render() {
    return (
      <div>
        <section>
          <div>Add Template Button</div>
          <input id='title' type="text" placeholder ='button title'/>
          <button onClick={this.saveButton}>Save</button>
          <button onClick={this.props.handleClose}>Cancel</button>
        </section>
      </div>
    )
  }
}

export default AddButtonTemplate
