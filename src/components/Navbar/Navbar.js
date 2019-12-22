import React from 'react'
import './Navbar.css'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'

const navbar = (props) => (
  <header className="navbar">

    <nav className="navbar__navigation">

      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler}/>
      </div>

      <div className="navbar__logo">
        <a href="/">The Logo</a>
      </div>
      <div className="spacer" />

      <div className="navbar_navigation_items">
        <ul>
          <li><a href="/">Edit</a></li>
          <li><a href="/">Sign In</a></li>
          <li><a href="/">Create Account</a></li>
          <li><a href="/">Sign Out</a></li>
          <li><a href="/">Configure</a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
