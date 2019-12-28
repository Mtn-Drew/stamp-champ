import React from 'react'
import './Navbar.css'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'

const allLinks = {
  stamps: [
    {
      name: 'Configure',
      link: '/configure'
    },
    {
      name: 'Sign Out',
      link: '/'
    }
  ],

  landing: [
    {
      name: 'Create Account',
      link: '#create-account'
    },
    {
      sign_in: 'Sign In',
      link: '/sign_in'
    }
  ],
  configure : [
    {
      name: 'Save',
      link: '/save'
    },
    {
      name: 'Cancel',
      link: '/cancel'
    },
    {
      name: 'Sign Out',
      link: '/sign_out'
    }
  ]
}

// function navLinks(page) {
//   return page === allLinks.page
// }

// function createLinks() {
//   allLinks.filter(navLinks)
// }


{/* <li><a href=""> </a></li> */}

const navbar = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>

      <div className="navbar__logo">
        <a href="/">The Logo</a>
      </div>
      <div className="spacer" />

      <div className="navbar_navigation_items">
        <ul>
          {props.onpage === 'stamps' ? <li><a href="/configure">Configure</a></li> : null }
          {props.onpage === 'stamps' ? <li><a href="/sign_out">Sign Out</a></li> : null }
          {props.onpage === 'landingPage' ? <li><a href="/#create_account">Create Account</a></li> : null }
          {props.onpage === 'landingPage' ? <li><a href="/sign_in">Sign In</a></li> : null }
          {props.onpage === 'configure' ? <li><a href="/save">Save</a></li> : null }
          {props.onpage === 'configure' ? <li><a href="/cancel">Cancel</a></li> : null }
          {props.onpage === 'configure' ? <li><a href="/sign_out">Sign Out</a></li> : null }
          {/* <li>
            <a href="/stamps">Create Account</a>
          </li>

          <li>
            <a href="/configure">Configure</a>
          </li>

          <li>
            <a href="/">Sign Out</a>
          </li> */}
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar
