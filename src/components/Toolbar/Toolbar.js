import React from 'react'
import './Toolbar.css'
// import PrivateRoute from '../Utils/PrivateRoute'
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute'

import { Route, Link } from 'react-router-dom'



const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
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
          />

          <Route
            path="/stamps"
            render={() => (
              <li>
                <button 
                  onClick={props.signOut}>Sign Out!!!</button>
              </li>
            )}
          />

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <a href="/create_account">Create Account</a>
              </li>
               )}
            
          />

          <Route
            path="/"
            exact
            render={(props) => (
              <li>
                <a href="/sign_in">Sign In</a>
              </li>
            )}
          />

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <a href="/save">Save</a>
              </li>
            )}
          />

          <Route
            path="/configure"
            render={(props) => (
              <li>
                <a href="/stamps">Done</a>
              </li>
            )}
          />

          <Route
            path="/configure"
            render={() => (
              <li>
                <button 
                  onClick={props.signOut}>Sign Out!!!</button>
              </li>
            )}
          />

          <Route
            path="/create_account"
            render={(props) => (
              <li>
                <a href="/">Cancel</a>
              </li>
            )}
          />

          <Route
            path="/sign_in"
            render={(props) => (
              <li>
                <a href="/">Cancel</a>
              </li>
            )}
          />
          <Route
            path="/add_button"
            render={(props) => (
              <li>
                <a href="/save">Save</a>
              </li>
            )}
          />
          <Route
            path="/add_button"
            render={(props) => (
              <li>
                <a href="/configure">Done</a>
              </li>
            )}
          />

          <Route
            path="/edit_button"
            render={(props) => (
              <li>
                <a href="/configure">Done</a>
              </li>
            )}
          />
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
