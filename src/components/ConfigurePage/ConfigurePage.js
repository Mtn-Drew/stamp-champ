import React, { Component } from 'react'
import Toolbar from '../Navbar/Navbar'
import StampPad from '../StampPad/StampPad'
import './ConfigurePage.css'
import {Button} from '../Button/Button'
 class ConfigurePage extends Component {

  state = {
    editText: false,
    editTitle: false
  }

handleEditTitle = ()=> {
  console.log('in handle Edit Title')
  this.setState({
    editTitle: !(this.state.editTitle)
  })
  console.log(this.state.editTitle)
}

handleEditText = () => {
  console.log('in handle Edit Text')
  this.setState({
    editText: !(this.state.editText)
  })
  console.log(this.state.editText)
}


  render() {

    const styleEditText = {
       
        transform: 'none',
        backgroundColor: 'tomato'
      
    }
    
    // const styleEditTitle = {
      
    // }

    // const styleDefault = {

    // }
    

    return (
      <div>
         <Toolbar />
        <h1>Configure Page</h1>
        <Button onClick={this.handleEditTitle}>Edit Title</Button>
        <Button onClick={this.handleEditText}>Edit Stamp Text</Button>
        <StampPad style={styleEditText} >
          <img src="src\art\pencil.png" alt="pencil icon"/>
          </StampPad>

      </div>
    )
  }
}

export default ConfigurePage

