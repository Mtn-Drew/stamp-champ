import React from 'react'
import { Button } from '../Button/Button'
import ShareService from '../../services/share-service'


class ShareableTemplates extends React.Component {

  state = {
    storeShareables: [],
    storeShareableTemplate: [],
    storeShares: [],
    storeSharesTemplate: [],
    selected: '',
    target: ''
  }

  loadShareables = () => {
    this.state.storeShareableTemplate.forEach((shareObject) => {
      ShareService.getShareables().then((result) => {
        const newSST = this.state.storeShareTemplate
        newSST.push(result)
        this.setState({
          storeShareables: newSST
        })
      })
    })
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
    ShareService.getShareables((value) => {
      this.setState({ storeShares: value })
    })
    Promise.all([
      ShareService.getShareables()
    ])
      .then((res) => {
        this.setState({ storeShareables: res[0] })
          this.loadShareables()
      })
      .catch((e) => {
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
  }

  templateSelect = (templ) => {
    this.setState({
      target: templ
    })
  }

  addToMyShares = () => {
    ShareService.addShareables(this.state.target.template_id)
  }

  render() {

    const shareablesRow = this.state.storeShareables.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(templ)}
          template={this.state.selectedTemplate}
          buttonStyle="share-stamp"
        >
          {this.state.storeShareables[i].template_title}
        </Button>
      )
    })

    return (
      <div>
        <p>These shareable templates are available to be added to your stamps.</p>
        <p>Click the button to see a description.</p>
        <br />
        {shareablesRow}
        <br />
        <div>
          <p>{this.state.target.template_desc}</p>
        </div>
        <Button onClick={this.addToMyShares} buttonStyle="system">
          Add to my load out
        </Button>
      </div>
    )
  }
}

export default ShareableTemplates