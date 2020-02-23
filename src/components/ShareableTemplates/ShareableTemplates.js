import React from 'react'
import { Button } from '../Button/Button'
import ShareService from '../../services/share-service'

class ShareableTemplates extends React.Component {
  state = {
    storeShareables: [],
    storeShareableTemplate: [],
    storeShares:[],
    storeSharesTemplate:[],
    selected: '',
    target: ''
  }

  loadShareables = () => {
    console.log('in loadShareables')
    console.log('storeShareables->', this.state.storeShareables)

    this.state.storeShareableTemplate.forEach((shareObject) => {
      console.log('in forEach loadShareables')

      //for each template listed on the shareable table, add to storeShareableTemplate state
      ShareService.getShareables().then((result) => {
        console.log('result ->', result)
        console.log('storeShareTemplate ', this.state.storeShareTemplate)
        const newSST = this.state.storeShareTemplate
        newSST.push(result)
        console.log('newSST ', newSST)

        this.setState({
          storeShareables: newSST
        })
      })
    })
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

    ShareService.getShareables((value) => {
      this.setState({ storeShares: value })
    })

    Promise.all([
      ShareService.getShareables()
      // StampsService.getStamps(),
      // ProfilesService.getProfiles(),
      // TemplateService.getTemplates()
    ])
      .then((res) => {
        this.setState({ storeShareables: res[0] })
        // this.setState({ storeStamps: res[1] })
        // this.setState({ storeProfile: res[2] })
        // this.setState({ storeTemplate: res[3] })
        this.loadShareables()
      })
      .catch((e) => {
        console.log('error->', e)
        if (e.error === 'Unauthorized request') {
          localStorage.clear()
          this.props.history.push('/sign_in')
        }
      })
  }

  templateSelect = (templ) => {
    console.log('in templateSelect')
    console.log('templ ', templ)
    this.setState({
      target: templ
    })
  }

  addToMyShares = () => {
    console.log('in addToMyShares')
    console.log('storeShareables ', this.state.storeSharables)
    ShareService.addShareables(this.state.target.template_id)
  }

  render() {
    console.log('shareables ', this.state.storeShareables)
    console.log('storeShareablesTemplate ', this.state.storeShareableTemplate)

    const shareablesRow = this.state.storeShareables.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(templ)}
          template={this.state.selectedTemplate}
        >
          {this.state.storeShareables[i].template_title}
        </Button>
      )
    })

  

    return (
      <div>
        <h1>These can be imported from the shareable table~</h1>
        <br />
        <button onClick={this.addToMyShares}>Add to my load out</button>
        <br />
        {shareablesRow}
        {/* {validatedShareablesRow} */}
        <div>
          <p>{this.state.target.template_desc}</p>
        </div>
      </div>
    )
  }
}

export default ShareableTemplates
