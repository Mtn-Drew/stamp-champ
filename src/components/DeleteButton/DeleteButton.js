import React from 'react'
// import STORE from '../../STORE'
import './DeleteButton.css'
import TemplateService from '../../services/template-service'
import ProfileService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'

class DeleteButton extends React.Component {
  handleDelete = () => {
    //alert 'are you sure?'
    console.log('in handleDelete')
    console.log(this.props.whatToEdit)
    // console.log(this.props.storeTemplate)
    if (this.props.whatToEdit === 'template') {
      console.log('in if')
      const tempArray = this.props.storeTemplate
      for (let i = 0; i < tempArray.length; i++) {
        // console.log(tempArray[i])
        // console.log(this.props.target.title)
        if (tempArray[i].title === this.props.target.title) {
          tempArray.splice(i, 1)
          console.log('remove template target')
          console.log('tempArray', tempArray)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
      TemplateService.deleteTemplate(this.props.target.id)
    }

    // console.log('props.storeProfile', this.props.storeProfile)
    if (this.props.whatToEdit === 'profile') {
      console.log('in if')
      const tempArray = this.props.storeProfile
      console.log('tempArray->', tempArray);
      for (let i = 0; i < tempArray.length; i++) { //instead of this for loop-> use .find and then delete from db??
        console.log('tempArray[i]',tempArray[i])
        console.log('i', i);
        console.log('target title->', this.props.target.title)
        if (tempArray[i].title === this.props.target.title) {
          console.log('tempArray before splice->',tempArray);
          tempArray.splice(i, 1)
          console.log('tempArray after splice->', tempArray);
          console.log('i in splice', i);
          console.log('remove profile target')

          console.log('tempArray', tempArray)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
      ProfileService.deleteProfile(this.props.target.id)
    }

    console.log('this.props.storeStamps', this.props.storeStamps)
    if (this.props.whatToEdit === 'stamp') {
      console.log('in if')
      const tempArray = this.props.storeStamps
      for (let i = 0; i < tempArray.length; i++) {
        console.log(tempArray[i])
        console.log(this.props.target.title)
        if (tempArray[i].title === this.props.target.title) {
          tempArray.splice(i, 1)
          console.log('remove stamp target')
          console.log('tempArray', tempArray)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
      StampsService.deleteStamp(this.props.target.id)
    }
  }

  render() {
    return (
      <div>
        <button className="delete" onClick={this.handleDelete}>
          DELETE
        </button>
      </div>
    )
  }
}

export default DeleteButton
