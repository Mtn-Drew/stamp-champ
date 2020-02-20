import React from 'react'
import './Toolbar.css'
import Logo from '../../art/logo.gif'

import { Route, Link } from 'react-router-dom'

const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <Route
        path="/"
        render={(props) => (
          <div className="navbar__logo">
            {/* <a href="/">{props.isLoggedIn ? <p>true</p> : <p>false</p>}</a> */}
            {/* <a href="/">Logo</a> */}
            <img src={Logo} href='/' alt="logo" />
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
                <button onClick={props.signOut}>Sign Out</button>
              </li>
            )}
          />

          {/* {!props.isLoggedIn ? ( */}
            <Route
              path="/"
              exact
              render={(props) => (
                <li>
                  <a href="/stamps">Stamps</a>
                </li>
              )}
            />
          {/* ) : ( */}
            <Route
              path="/"
              exact
              render={(props) => (
                <li>
                  <Link to="/create_account">Create Account</Link>
                </li>
              )}
            />
          {/* )} */}

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
                <button onClick={props.signOut}>Sign Out!!!</button>
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
              exact
              render={(props) => (
                <li>
                  <Link to="/create_account">Create Account</Link>
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
                <Link to="/configure">Done</Link>
              </li>
            )}
          />
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
