import React from 'react'
import { Button } from '../Button/Button'
import ShareService from '../../services/share-service'
import ShareableTemplates from '../ShareableTemplates/ShareableTemplates'
import {  withRouter } from 'react-router-dom'


class SharedTemplates extends React.Component {

  state = {
    storeShares: [],
    storeShareTemplate: [],
    selected: '',
    target: ''
  }

  loadShares = () => {

    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedTemplates(shareObject.template_id).then(
        (result) => {
          const newSST = this.state.storeShareTemplate
          newSST.push(result)
          this.setState({
            storeShareTemplate: newSST
          })
        }
      )
    })

    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedProfiles(shareObject.template_id).then((result) => {
        console.log(result)
        this.setState({
          storeShareProfile: result
        })
      })
    })

    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedStamps(shareObject.template_id).then((result) => {
        this.setState({
          storeShareStamp: result
        })
      })
    })
  }

  componentDidMount() {

    ShareService.getShares((value) => {
      this.setState({ storeShares: value })
    })

    Promise.all([
      ShareService.getShares()
    ])
      .then((res) => {
        this.setState({ storeShares: res[0] })
        this.loadShares()
      })
      .catch((e) => {
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
  }

  templateSelect = (id) => {
    this.setState({
      target: id
    })
  }

  deleteShare = async ()=> {
    await ShareService.deleteSharedTemplate(this.state.target.id)
    this.props.history.push("/stamps")
  }

  render() {

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
        <ShareableTemplates shared={this.state.storeShareTemplate}/>
      </div>
    )
  }
}

export default withRouter(SharedTemplates)
