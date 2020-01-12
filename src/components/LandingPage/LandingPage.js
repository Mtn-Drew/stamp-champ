import React, { Component } from 'react'
import email from '../../art/email.webp'
import edit from '../../art/edit.webp'
import './LandingPage.css'

 class LandingPage extends Component {
  render() {
    return (
     
      <div>
    
    <main role="main">
      <header role="banner" id="top">
        <h1>Stamp Champ</h1>
        <h2>Your Digital Rubber Stamp</h2>
      </header>
      <section>
        <header>
          <h3>
            Take the drudgery out of frequently copying and pasting the same
            information over and over...  Use it for work.  Use if for home, or anywhere you need to output the same text over and over.
          </h3>
        </header>
        <p><img src={email} alt="fast email" /></p>
        <p>
          Stamp Champ takes your most copied items and stores them in a button
          that you simply click to access. Click and paste. That's it.
        </p>
      </section>
      <section>
        <header>
          <h3>Completely Customizable.</h3>
        </header>
        <p>
        <img src={edit} alt="edit buttons" />
        </p>
        <p>
          Choose from pre-made copies, or create your own. Each button is
          customizable, and can include whatever text you choose.
        </p>
      </section>
      <section>
        <header>
          <h3>
            Share your custom layout with friends or co-workers, or download a
            layout pre-build by your employer.
          </h3>
        </header>
        
        <p>
          Its as easy as downloading or uploading a csv file, right from the
          app.
        </p>

        <h3>How it Works</h3>
        <p>There are three rows of buttons.  The top row is your template row.  These are linked to catagories of more specific profiles, for example, Work and Home.</p>
        <p>The second row of buttons are your profiles.  These are sub-catagories that describe the button set they are linked to.</p>
        <p>
          You can have up to four templates, and each template can in turn have up to four profiles.
        </p>
        <p>Finally, the bottom buttons are your stamps!  Each stamp has loaded text that copies to your clipboard when clicked.  No need for Sticky Notes to copy and paste from.  No need to type out over and over again that one last need you forgot to add to your email template.  Just click and paste!</p>
      </section>
      
    </main>
    <footer >Footer</footer>
  </div>
    )
  }
}

export default LandingPage