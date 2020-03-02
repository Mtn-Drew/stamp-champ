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
    isLoaded: false,
    items: [],
    stampValue: '',
    hightlight: false
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
      stampValue: ''
    })
    console.log('selected profile is ', this.state.selectedProfile)
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId,
      stampValue: '',
      selectedProfile:''
    })
  }

  stampSelect = (stampContent) => {
    this.setState({
      stampValue: stampContent
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
      TemplateService.getTemplates()
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
    //for each
    console.log('in loadShares')
    console.log('storeShares->', this.state.storeShares)
    //get every template where user is listed on shared table
    this.state.storeShares.forEach((shareObject) => {
      console.log('in forEach templates')
      //for each template listed on the shared table, add to storeSharedTemplate state
      ShareService.getSharedTemplates(shareObject.template_id).then(
        (result) => {
          console.log('result ->', result)
          console.log('storeShareTemplate ', this.state.storeShareTemplate)
          const newSST = this.state.storeShareTemplate
          newSST.push(result)
          console.log('newSST ', newSST)

          // this.setState({
          //   storeShareTemplate: this.state.storeShareTemplate.push(result)
          // })

          //  this.setState({ storeShareTemplate: this.state.storeShareTemplate.concat[result]})

          this.setState({
            storeShareTemplate: newSST
          })

          //  this.setState({
          //   storeShareTemplate: [result]
          // })
          //'result' is an object; we need to first put it in an array and append it to storeShareTemplate in case there is more than one
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

  render() {
    console.log('in RENDER SP')
    console.log('storeTemplate', this.state.storeTemplate)
    console.log('storeProfile', this.state.storeProfile)
    console.log('storeStamps', this.state.storeStamps)
    console.log('shares', this.state.storeShares)
    console.log('storeShareTemplate', this.state.storeShareTemplate)
    console.log('storeShareProfile', this.state.storeShareProfile)
    console.log('storeShareStamps', this.state.storeShareStamp)

    const myTemplateRow = this.state.storeTemplate.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onMouseOver={() => this.templateSelect(templ.id)}
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
          onMouseOver={() => this.templateSelect(templ.id)}
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
            onMouseOver={() => this.profileSelect(prof.id)}
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
            onMouseOver={() => this.profileSelect(prof.id)}
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
            //className="btn--primary--solid"
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
            //className="btn--primary--solid"
          >
            {stamp.title}
          </Button>
        )
      })

    const stampRow = myStampRow.concat(shareStampRow)

    return (
      <div className="main-wrapper">
        <div style={{ height: '100%' }} 
        //className="stampButtons"
        >
          <main style={{ marginTop: '64px' }}>
            <div className="template-row">
              <div className="spacer" />
              <div 
              //className="template"
              >{templateRow} </div>
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
