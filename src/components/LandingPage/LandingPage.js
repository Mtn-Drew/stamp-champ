import React, { Component } from 'react'
import './LandingPage.css'

import email from '../../art/email.webp'
import sn2 from '../../art/sn2a2.jpg'
import qn2 from '../../art/qn2.jpg'
import shrink1 from '../../art/shrink1.webp'
// import config1 from '../../art/config1.webp'
import config1 from '../../art/config12.JPG'
// import newTemp from '../../art/newTemp.webp'
// import newProf from '../../art/newProf.webp'
import newStamp from '../../art/three.JPG'

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
            <div>
              <h4>
                <ul className="dashed">
                  <li>
                    Take the drudgery out of frequently copying and pasting the
                    same information over and over...
                  </li>
                  <li> Make your workflow faster and easier.</li>
                  <li>
                    Customize notes, email responses, or anything you might want
                    to store as text for future use.
                  </li>
                </ul>
              </h4>
            </div>
            <img src={email} alt="fast email" />
            <h2>What is Stamp Champ?</h2>
            <h3>Stamp Champ is a QuickNotes replacement.</h3>
            <p>
              How many of us still remember the old days when we copied our
              QuickNotes to a folder on our bookmarks tab? Remember how we had
              to manually update them every time there was a change? The
              QuickNotes chrome extension was a huge improvement on that
              process. Updates were handled by leadership and was an automated
              process. No longer did we have to worry about using the latest
              version of the notes. Unfortunately, as we migrate away from
              Current and to Grid, we are losing the QuickNotes functionality.
              The extension won't work on the new website.
            </p>
            <img src={qn2} alt="quick notes" />
            <h3>Stamp Champ is an AutoText replacement.</h3>
            <p>
              The AutoText feature that we have been given to replace QuickNotes
              on Grid is functional, but slow and clunky. Stamp Champ makes the
              process of finding and selecting your auto notes faster and
              easier. No need for cycling through endless, slow dropdowns to
              find the right note. No need to wonder if you are picking the
              right note. Stamp Champ makes finding and selecting the right note
              fast and easy. You can even preview each note before selecting it.
            </p>
            <img src={sn2} alt="sticky notes" />
            <h3>Stamp Champ is a Sticky Notes replacement.</h3>
            <p>
              How many of us keep a full screen of Sticky Notes to copy and
              paste from? Email snippets. Language for specific but rare
              situations. Anything you save for later so you don't have to
              re-write it every time can go into Stamp Champ. Now you don't need
              to clutter your screen for all those snippets of text we save and
              use throughout our day. Instead, you can store those canned
              messages in a button 'stamp’ and click it when you need it.
            </p>
            <h3>How to use Stamp Champ</h3>
            <p>
              Stamp Champ is a web app. Essentially, it is a website. Just open
              your browser and navigate to the website to use. That's it. There
              is nothing to install. Once you have set up your Stamp Champ (see
              getting started below), it is recommended that you use a different
              web browser than your main browser for the app. This will help
              keep focus on your primary browser. As we agents use Chrome as our
              main browser, use Edge for Stamp Champ. Then shrink down your
              Stamp Champ browser to small as you can get it while still having
              two rows of stamps. You can keep your Stamp Champ instance
              alongside your main browser, or in a different window.
            </p>
            <img src={shrink1} alt="shrink your window" />
            <p>
              There are three sets of buttons in Stamp Champ. The top row is
              your templates. These store broad categories of subjects, such as
              Agent QuickNotes.{' '}
            </p>
            <p>
              The second set of buttons are your profile buttons. These break
              down your template into smaller sub-categories.
            </p>
            <p>
              The bottom set of buttons is your stamps. These store your saved
              text.
            </p>
            <p>
              To select a template or profile, simply click the button. To
              preview the stamps, hover your mouse over them. To select the text
              and copy it to your clipboard, click the stamp button. Then paste
              in your note/email/whatever! It's that simple.
            </p>
            <h3>Getting Started</h3>
            <p>To start using Stamp Champ, you will first need to create an account.  Click on the ‘Create Account’ link in the navigation bar and follow the prompts.  Be sure to use a password you can remember.  Once your account is created, sign in with your new credentials.</p>
            <p>The first time you sign in, you will have only one template, which is empty.  The first thing you will want to do is to load the pre-made AutoText notes.  Stamp Champ has the ability for administrators to create sharable templates that can be imported to individual accounts.</p>
            <p>Click on 'Configure' in the navigation bar.  There you will find two toggles.  The top toggle lets you switch between your custom templates, and those templates shared with you.  Click the toggle to switch to shared stamps.</p>
            <img src={config1} alt="configure your window" />
            
            <p>Once you have selected 'Shared Stamps', you will be presented with two items.  The top item shows sharable templates that you have imported.  It will be blank as you haven't yet imported any templates.  The second item will show all the templates you may import.  You should see a button for the Property and Title Agent AutoText template.</p>
            <p>Click the 'Agent' button to select it, then click the 'Add to my load out' button to import it into your account.  Click 'Done' in the navigation menu to return to the main Stamps page.  Now you will see your blank template along with a new gold 'Agent' button.</p>
            <p>Congratulations!  You have now imported AutoText notes!  Click the gold 'Agent' button to expose the associated profile buttons and click the profile buttons to expose the stamps.  Hover over the stamps to see a preview of the associated text and click the stamp to copy the text to your clipboard.</p>
            <p>If all you want to use Stamp Champ for is QuickNotes/AutoText, you are all set.  However, the real power of Stamp Champ is the ability to create your own stamps!</p>
           
            
            <img src={newStamp} alt="new stamp" />
            <h3>Creating Your First Custom Stamps</h3>
            <p>Let’s start by changing the name of your custom template.  First, click 'Configure' in the navigation bar.  On the Configuration screen, you should have one red template button with the label 'Your First Template'.  Let’s change that to something that makes more sense.</p>
            <p>Click the bottom toggle to get into 'Edit' mode.  Your template button should have turned white. Now click your template button.  On the bottom display, you will see the template name box highlighted.  The Profile, Stamp, and Content boxes are grayed out because there is nothing to edit on a template button but the name.  Let's change the name to something more personal.  Once you have picked a new name, click the 'Submit' button to save the changes.</p>
            <p>Now let’s add a profile.  </p>
            <h3>Add a Profile Button.</h3>
            <p>At the very bottom of the Configuration page is the Add Button section.  There you can select which type of button you want to add.  Select 'Profile Button' from the dropdown.  Each profile must be associated with a template button.  Select a template from the second dropdown.  At this point you have only one.  Once you have selected your template, all that's left is to name your profile button.  Let's call this button "Email".  Click the submit button.  Next, lets add a stamp.</p>
            <h3>Add a Stamp</h3>
            <p>Once again, go to the bottom of the 'Configuration' page to the add button dropdown.  This time select 'Stamp Button'.  Now you will be prompted to select a profile to associate your new button with.  We only have one choice at this point, so let's select 'Email'.  Now you will be prompted with two boxes- the 'New Stamp Name' box, and the 'New Stamp Content' box.  Put a name for your new stamp in the name box.  We'll call ours 'SUBJECT LINE'.  Then in the content box, enter the text for your new button.  Let's make a stamp to fill in the subject line for when we need to send a non-template email.  In the content box, type 'TESLA - Solar Follow Up - '.  Then click 'Submit'.  You now have a custom stamp! Yay!  Click 'Done' in the navigation bar to return to your stamp page.</p>
            <p>You now have two templates- the 'Agent' template is gold, because its shared with you.  The red button is your custom template.  You can add to, edit or delete custom templates.  You can only add or delete shared templates.  Only the shared template creator can edit sharable templates.</p>
<h3>Edit or Delete a Stamp</h3>
<p>Let's make another stamp.  Follow the steps above to make a stamp and just put "TEST" in every line.  Then click 'Done' in the navigation bar and make sure you have a new stamp called "TEST".  Now let's edit our new button.  Click 'Configure' in the navigation bar.  Only your red template button is visible.  To add or delete the gold shared template(s), you click the top slider.  But we want to edit our own custom stamps.  </p>
<p>In order to make changes or delete our own buttons, they must be selected first.  Click your custom template button and the "EMAIL" profile button will appear.  Then click the "EMAIL" profile button and your stamps will appear.  Now that the button we want to edit is visible, click the bottom toggle to enter edit mode.</p>
<p>If we wanted to delete our button, all we need to do is click the button select it, the click 'DELETE'.  Let's edit our button instead.  Click the "TEST" button to select it. In the stamp name box, let's change it to "NEED PERMISSION".  In the content box, let's change that to</p>
<div>
  <p>'Hello,</p>
  <p>I hope this finds you well.  I have been informed that you have a buyer for this property, and I would like to start the solar transfer process.  However, the first step in my process is to get your permission to share information about your solar contract with everyone involved in the home sale.  Do I have that?'.  </p>
  
  </div>
<p>When finished, click "SUBMIT" and then "DONE".</p>
<p>Congratulations!  You now have two stamps- an email "SUBJECT LINE" stamp, and an email "NEED PERMISSION" stamp.  Now you can request permission (from those sellers who won't read a long email) with just a couple clicks. Yay!</p>
            {/* <p>
              Stamp Champ takes your most copied items and stores them in a
              button that you simply click to access. Click and paste. That's
              it.
            </p>
          </section>
          <section>
            <header>
              <h3>Completely Customizable.</h3>
            </header>
            <img src={edit} alt="edit buttons" />
            <p>
              Choose from pre-made copies, or create your own. Each button is
              customizable, and can include whatever text you choose.
            </p>
          </section>
          <section>
            <header>
              <h3>
                Share your custom layout with friends or co-workers, or download
                a layout pre-build by your employer.
              </h3>
            </header>
            <p>
              Its as easy as downloading or uploading a csv file, right from the
              app.
            </p>
            <h3>How it Works</h3>
            <p>
              First, shrink you browser width until it stops. You only need a
              small window to hold your stamps, and you don't want to cover your
              work.
            </p>
            <p>
              There are three rows of buttons. The top row is your template row.
              These are linked to catagories of more specific profiles, for
              example, Work and Home.
            </p>
            <p>
              The second row of buttons are your profiles. These are
              sub-catagories that describe the button set they are linked to.
            </p>
            <p>
              You can have up to four templates, and each template can in turn
              have up to four profiles.
            </p>
            <p>
              Finally, the bottom buttons are your stamps! Each stamp has loaded
              text that copies to your clipboard when clicked. No need for
              Sticky Notes to copy and paste from. No need to type out over and
              over again that one last need you forgot to add to your email
              template. Just click and paste!
            </p> */}
            <h1>Click 'Sign In' to Begin!</h1>
          </section>
        </main>
      </div>
    )
  }
}

export default LandingPage
