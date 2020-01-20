import React from 'react'
// import STORE from '../../STORE'
import './DeleteButton.css'

class DeleteButton extends React.Component {

  handleDelete = () => {
    //alert 'are you sure?'
    console.log('in handleDelete')
    console.log(this.props.whatToEdit)
    console.log(this.props.storeTemplate)
    if (this.props.whatToEdit === 'template') {
      console.log('in if')
      const tempArray = this.props.storeTemplate
      for (let i = 0; i < tempArray.length; i++) {
        console.log(tempArray[i])
        console.log(this.props.target)
        if (tempArray[i].title === this.props.target) {
          tempArray.splice(i, 1)
          console.log('remove template target')
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
    }

    if (this.props.whatToEdit === 'profile') {
      console.log('in if')
      const tempArray = this.props.storeProfile
      for (let i = 0; i < tempArray.length; i++) {
        console.log(tempArray[i])
        console.log(this.props.target)
        if (tempArray[i].title === this.props.target) {
          tempArray.splice(i, 1)
          console.log('remove profile target')
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
    }

    if (this.props.whatToEdit === 'stamp') {
      console.log('in if')
      const tempArray = this.props.storeStamps
      for (let i = 0; i < tempArray.length; i++) {
        console.log(tempArray[i])
        console.log(this.props.target)
        if (tempArray[i].title === this.props.target) {
          tempArray.splice(i, 1)
          console.log('remove template target')
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }

      }
    }
  }

  render() {

    return (
      <div>
        <button className="delete" onClick={this.handleDelete}>DELETE</button>
      </div>
    )
  }
}

export default DeleteButton
