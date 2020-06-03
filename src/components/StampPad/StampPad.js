import React from 'react'
import { Button } from '../Button/Button'
import './StampPad.css'
import TemplateService from '../../services/template-service'
import ProfilesService from '../../services/profile-service'
import StampsService from '../../services/stamp-service'
import ShareService from '../../services/share-service'

class StampPad extends React.Component {
  state = {
    storeTemplate: [],
    storeProfile: [],
    storeStamps: [],
    storeShares: [],
    storeShareTemplate: [],
    storeShareProfile: [],
    storeShareStamp: [],
    isLoading: false,
    items: [],
    stampValue: '',
  }

  copyToClipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    this.setState({ highlight: true })
    setTimeout(() => {
      this.setState({ highlight: false })
    }, 100)
  }

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId,
      stampValue: '',
    })
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId,
      stampValue: '',
      selectedProfile: '',
    })
  }

  stampSelect = (stampContent) => {
    this.setState({
      stampValue: stampContent,
    })
  }

  componentDidMount() {
    TemplateService.getTemplates((value) => {
      this.setState({ storeTemplate: value })
    }).catch((e) => {
      console.log('error->', e)
      if (e.error === 'Unauthorized request') {
        localStorage.clear()
        this.props.history.push('/sign_in')
      }
    })
    ProfilesService.getProfiles((value) => {
      this.setState({ storeProfile: value })
    })
    StampsService.getStamps((value) => {
      this.setState({ storeStamps: value })
    })
    ShareService.getShares((value) => {
      this.setState({ storeShares: value })
    })

    Promise.all([
      ShareService.getShares(),
      StampsService.getStamps(),
      ProfilesService.getProfiles(),
      TemplateService.getTemplates(),
    ])
      .then((res) => {
        this.setState({ storeShares: res[0] })
        this.setState({ storeStamps: res[1] })
        this.setState({ storeProfile: res[2] })
        this.setState({ storeTemplate: res[3] })
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

  loadShares = () => {
    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedTemplates(shareObject.template_id).then(
        (result) => {
          const newSST = this.state.storeShareTemplate
          newSST.push(result)
          this.setState({
            storeShareTemplate: newSST,
          })
        }
      )
    })

    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedProfiles(shareObject.template_id).then((result) => {
        this.setState({
          storeShareProfile: result,
        })
      })
    })

    this.state.storeShares.forEach((shareObject) => {
      ShareService.getSharedStamps(shareObject.template_id).then((result) => {
        this.setState({
          storeShareStamp: result,
        })
      })
    })
  }

  render() {
    const myTemplateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(templ.id)}
          template={this.state.selectedTemplate}
        >
          {this.state.storeTemplate[i].title}
        </Button>
      )
    })

    const shareTemplateRow = this.state.storeShareTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          buttonStyle="share-stamp"
          onClick={() => this.templateSelect(templ.id)}
          template={this.state.selectedTemplate}
        >
          {this.state.storeShareTemplate[i].title}
        </Button>
      )
    })

    const templateRow = myTemplateRow.concat(shareTemplateRow)

    const myProfileRow = this.state.storeProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )
      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            onClick={() => this.profileSelect(prof.id)}
            profile={this.state.storeProfile}
          >
            {prof.title}
          </Button>
        )
      })

    const shareProfileRow = this.state.storeShareProfile
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            buttonStyle="share-stamp"
            className="share-button"
            onClick={() => this.profileSelect(prof.id)}
            profile={this.state.storeShareProfile}
          >
            {prof.title}
          </Button>
        )
      })

    const profileRow = myProfileRow.concat(shareProfileRow)

    const myStampRow = this.state.storeStamps
      .filter((selected) => selected.profile_id === this.state.selectedProfile)
      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.storeStamps[i].title}
            text={this.state.storeStamps[i].content}
            onMouseOver={() => {
              this.stampSelect(stamp.content)
            }}
          >
            {stamp.title}
          </Button>
        )
      })

    const shareStampRow = this.state.storeShareStamp
      .filter((selected) => selected.profile_id === this.state.selectedProfile)
      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            buttonStyle="share-stamp"
            className="share-button"
            onClick={() => this.copyToClipboard(stamp.content)}
            title={this.state.storeShareStamp[i].title}
            text={this.state.storeShareStamp[i].content}
            onMouseOver={() => {
              this.stampSelect(stamp.content)
            }}
          >
            {stamp.title}
          </Button>
        )
      })

    const stampRow = myStampRow.concat(shareStampRow)

    return (
      <div className="main-wrapper">
        <div style={{ height: '100%' }}>
          <main style={{ marginTop: '64px' }}>
            <div className="template-row">
              <div className="spacer" />
              <div>{templateRow} </div>
              <div className="spacer" />
            </div>
            <hr className="hr" />
            <div className="profile-row">
              <div className="spacer" />
              <div>{profileRow}</div>
              <div className="spacer" />
            </div>
            <hr className="hr" />
            <div className="stamp-row">
              <div className="">{stampRow}</div>
            </div>
            <hr className="hr" />
            <div>
              <textarea
                className={`stamp-textarea ${
                  this.state.highlight ? 'text-border-blink' : ''
                }`}
                name="stamp_display"
                id="stamp_display"
                cols="30"
                rows="30"
                value={this.state.stampValue}
                readOnly
              />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default StampPad
