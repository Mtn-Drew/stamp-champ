import React from 'react'
import './Navbar.css'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import { Route } from 'react-router-dom'

const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>

      <Route
        path="/"
        render={(props) => (
          <div className="navbar__logo">
            <a href="/">The Logo</a>
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
            path="/"
            exact
            render={(props) => (
              <li>
                <a href="/create_account">Create Account</a>
              </li>
            )}
          ></Route>

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <a href="/sign_in">Sign In</a>
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
                <a href="/stamps">Cancel</a>
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

          <Route
            path="/create_account"
            render={(props) => (
              <li>
                <a href="/">Cancel</a>
              </li>
            )}
          ></Route>

          <Route
            path="/sign_in"
            render={(props) => (
              <li>
                <a href="/">Cancel</a>
              </li>
            )}
          ></Route>
          <Route
            path="/add_button"
            render={(props) => (
              <li>
                <a href="/save">Save</a>
              </li>
            )}
          ></Route>
          <Route
            path="/add_button"
            render={(props) => (
              <li>
                <a href="/configure">Done</a>
              </li>
            )}
          ></Route>

          {/* <Route
            path="/edit_button"
            render={(props) => (
              <li>
                <a href="/save">Save</a>
              </li>
            )}
          ></Route> */}

          <Route
            path="/edit_button"
            render={(props) => (
              <li>
                <a href="/configure">Cancel</a>
              </li>
            )}
          ></Route>

          
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
