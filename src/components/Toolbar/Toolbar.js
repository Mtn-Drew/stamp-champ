import React from 'react'
import './Toolbar.css'
import Logo from '../../art/logo.gif'

import { Route, NavLink } from 'react-router-dom'

const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <Route
        path="/"
        render={(props) => (
          <div className="navbar__logo">
            <NavLink to="/">
              <img src={Logo} alt="stamp champ logo" />
            </NavLink>
          </div>
        )}
      />

      <div className="spacer" />

      <div className="navbar_navigation_items">
        <ul>
          <Route
            path="/stamps"
            render={(props) => (
              <li>
                <NavLink to="/configure">Configure</NavLink>
              </li>
            )}
          />

          {/* <Route
            path="/stamps"
            render={() => (
              <li>
                <button onClick={props.signOut}>Sign Out</button>
              </li>
            )}
          /> */}

          <Route
            path="/stamps"
            render={() => (
              <li>
                <NavLink to='/' onClick={props.signOut}>Sign Out</NavLink>
              </li>
            )}
          />

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <NavLink to="/stamps">Stamps</NavLink>
              </li>
            )}
          />

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <NavLink to="/create_account">Create Account</NavLink>
              </li>
            )}
          />

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <NavLink to="/sign_in">Sign In</NavLink>
              </li>
            )}
          />

          {/* <Route
            path="/configure"
            render={(props) => (
              <li>
                <NavLink to="/save">Save</NavLink>
              </li>
            )}
          /> */}

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <NavLink to="/stamps">Done</NavLink>
              </li>
            )}
          />

          {/* <Route
            path="/configure"
            render={() => (
              <li>
                <button onClick={props.signOut}>Sign Out!!!</button>
              </li>
            )}
          /> */}
          <Route
            path="/configure"
            render={() => (
              <li>
                <NavLink to='/' onClick={props.signOut}>Sign Out</NavLink>
              </li>
            )}
          />

          <Route
            path="/create_account"
            render={(props) => (
              <li>
                <NavLink to="/">Cancel</NavLink>
              </li>
            )}
          />

          <Route
            path="/sign_in"
            exact
            render={(props) => (
              <li>
                <NavLink to="/create_account">Create Account</NavLink>
              </li>
            )}
          />
          <Route
            path="/sign_in"
            render={(props) => (
              <li>
                <NavLink to="/">Cancel</NavLink>
              </li>
            )}
          />
          {/* <Route
            path="/add_button"
            render={(props) => (
              <li>
                <NavLink to="/save">Save</NavLink>
              </li>
            )}
          />
          <Route
            path="/add_button"
            render={(props) => (
              <li>
                <NavLink to="/configure">Done</NavLink>
              </li>
            )}
          /> */}

          {/* <Route
            path="/edit_button"
            render={(props) => (
              <li>
                <NavLink to="/configure">Done</NavLink>
              </li>
            )}
          /> */}
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
