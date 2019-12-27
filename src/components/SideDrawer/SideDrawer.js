import React from 'react'
import './SideDrawer.css'

const SideDrawer = props => {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }
  return (
  <nav className={drawerClasses} > 

    
    <ul>
    <li><a href="/">Create Account</a></li>
      
      
    
      <li><a href="/">Configure</a></li>
      <li><a href="/">Sign In/Out</a></li>
    </ul>
  </nav>
    )
  }


export default SideDrawer
