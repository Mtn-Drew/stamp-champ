import React from 'react'
import './Navbar.css'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>


<Route path="/" render={(props) => (
      <div className="navbar__logo">
        <a href="/home">The Logo</a>
      </div>
       )}
       ></Route>

      <div className="spacer" />

      <div className="navbar_navigation_items">
        <ul>
          <Route
            path="/stamps"
            render={(props) => (
              <li>
                <a href="/configure">Configure</a>
              </li>
            )}
          ></Route>

          <Route
            path="/stamps"
            render={(props) => (
              <li>
                <a href="/">Sign Out</a>
              </li>
            )}
          ></Route>

          <Route
            path="/home"
            render={(props) => (
              <li>
                <a href="/#create_account">Create Account</a>
              </li>
            )}
          ></Route>

          <Route
            path="/home"
            render={(props) => (
              <li>
                <a href="/stamps">Sign In</a>
              </li>
            )}
          ></Route>

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <a href="/save">Save</a>
              </li>
            )}
          ></Route>

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <a href="/cancel">Cancel</a>
              </li>
            )}
          ></Route>

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <a href="/">Sign Out</a>
              </li>
            )}
          ></Route>
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
