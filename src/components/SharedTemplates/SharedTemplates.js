import React from 'react'
import { Button } from '../Button/Button'
import ShareService from '../../services/share-service'

class SharedTemplates extends React.Component {
  state = {
    storeShares: [],
    storeShareTemplate: [],
    selected: '',
    target: ''
  }

  loadShares = () => {
    //for each
    console.log('in loadShares')
    console.log('storeShares->', this.state.storeShares)
    //get every template where user is listed on shared table
    this.state.storeShares.forEach((shareObject) => {
      console.log('in forEach shares')
      //for each template listed on the shared table, add to storeSharedTemplate state
      ShareService.getSharedTemplates(shareObject.template_id).then(
        (result) => {
          console.log('st result ->', result)
          console.log('st storeShareTemplate ', this.state.storeShareTemplate)
          const newSST = this.state.storeShareTemplate
          newSST.push(result)
          console.log('st newSST ', newSST)

          this.setState({
            storeShareTemplate: newSST
          })
        }
      )
    })

    //get every profile with shared template_id
    this.state.storeShares.forEach((shareObject) => {
      console.log('in forEach profiles')
      //for each template listed on the shared table, add the profiles to storeSharedProfile state
      ShareService.getSharedProfiles(shareObject.template_id).then((result) => {
        console.log(result)
        this.setState({
          storeShareProfile: result
        })
      })
    })

    //get every profile with shared template_id
    this.state.storeShares.forEach((shareObject) => {
      console.log('in forEach stamps')
      //for each template listed on the shared table, add the stamps to storeSharedStamp state
      ShareService.getSharedStamps(shareObject.template_id).then((result) => {
        console.log(result)
        this.setState({
          storeShareStamp: result
        })
      })
    })
  }

  componentDidMount() {
    // this.loadShares()

    ShareService.getShares((value) => {
      this.setState({ storeShares: value })
    })

    Promise.all([
      ShareService.getShares()
      // StampsService.getStamps(),
      // ProfilesService.getProfiles(),
      // TemplateService.getTemplates()
    ])
      .then((res) => {
        this.setState({ storeShares: res[0] })
        // this.setState({ storeStamps: res[1] })
        // this.setState({ storeProfile: res[2] })
        // this.setState({ storeTemplate: res[3] })
        this.loadShares()
      })
      .catch((e) => {
        console.log('error->', e)
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
  }

  templateSelect = (id) => {
    console.log('in templateSelect')
    this.setState({
      target: id
    })
  }

  deleteShare = () => {
    ShareService.deleteSharedTemplate(this.state.target.id)
    //load shares? to update shared with me?? (the deleted share should disappear)
  }

  render() {
    console.log('shares', this.state.storeShares)
    console.log('storeShareTemplate', this.state.storeShareTemplate)

    const shareTemplateRow = this.state.storeShareTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          //onMouseOver={() => this.templateSelect(templ.id)}
          onClick={() => this.templateSelect(templ)}
          template={this.state.selectedTemplate}
          buttonStyle="share-stamp"
        >
          {this.state.storeShareTemplate[i].title}
        </Button>
      )
    })

    return (
      <div>
        <p>These are the current shareable templates you have imported.</p>
        <br />
        {shareTemplateRow}
        <br />
        <p></p>
        <Button onClick={this.deleteShare} buttonStyle="system">
          QUIT SHARING
        </Button>
      </div>
    )
  }
}

export default SharedTemplates
