import React from 'react'
import './DeleteButton.css'
import { Button } from '../Button/Button'
import TemplateService from '../../services/template-service'
import ProfileService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'


class DeleteButton extends React.Component {

  handleDelete = () => {

    if (this.props.whatToEdit === 'template') {
      const tempArray = this.props.storeTemplate

      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].title === this.props.target.title) {
          tempArray.splice(i, 1)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
      TemplateService.deleteTemplate(this.props.target.id)
    }

    if (this.props.whatToEdit === 'profile') {
      const tempArray = this.props.storeProfile
   
      for (let i = 0; i < tempArray.length; i++) { //instead of this for loop-> use .find and then delete from db??
        if (tempArray[i].title === this.props.target.title) {
          tempArray.splice(i, 1)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }
      ProfileService.deleteProfile(this.props.target.id)
    }

    if (this.props.whatToEdit === 'stamp') {
      const tempArray = this.props.storeStamps
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].title === this.props.target.title) {
          tempArray.splice(i, 1)
          this.props.onDeleteButton(this.props.whatToEdit, tempArray)
        }
      }      
        StampsService.deleteStamp(this.props.target.id)
    }
  }

  render() {
    return (
      <div>
        <Button buttonStyle='system' onClick={this.handleDelete}>
          DELETE
        </Button>
      </div>
    )
  }
}

export default DeleteButton