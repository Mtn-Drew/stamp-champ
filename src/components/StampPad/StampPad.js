import React from 'react'
import { Button } from '../Button/Button'
import STORE from '../../STORE'

class StampPad extends React.Component {
  state = {
    store: STORE,
    selectedTemplate: STORE.template[0].id,
    selectedProfile: STORE.stamps[0].load_out_id
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
  }

  profileSelect = (profileId) => {
    this.setState({
      selectedProfile: profileId
    })
  }

  templateSelect = (templateId) => {
    this.setState({
      selectedTemplate: templateId
    })
  }

  

  render() {
    const navItems = (
      <>
    <li>
    <a href="/configure">Configure</a>
  </li>
  <li>
  <a href="/">Sign Out</a>
</li>
</>
  )
    const templateRow = this.state.store.template.map((templ, i) => {
      return (
        <Button
          key={templ.id}
          onClick={() => this.templateSelect(this.state.store.template[i].id)}
          template={this.state.selectedTemplate}
        >
          {this.state.store.template[i].title}
        </Button>
      )
    })

    const profileRow = this.state.store.load_out
      .filter(
        (selected) => selected.template_id === this.state.selectedTemplate
      )

      .map((prof, i) => {
        return (
          <Button
            key={prof.id}
            onClick={() => this.profileSelect(prof.id)}
            onMouseEnter={() => console.log('mouse')}
          >
            {prof.title}
          </Button>
        )
      })

    const stampRow = this.state.store.stamps
      .filter((stamp) => stamp.load_out_id === this.state.selectedProfile)

      .map((stamp, i) => {
        return (
          <Button
            key={stamp.id}
            onClick={() => this.copyToClipboard(stamp.content)}
          >
            {stamp.title}
          </Button>
        )
      })

    return (
      <div style={{ height: '100%' }}>
        <main style={{ marginTop: '64px' }}>
          <div className="template">{templateRow} </div>
          <hr className="hr" />
          <div>{profileRow}</div>
          <hr className="hr" />
          <div>{stampRow}</div>
        </main>
      </div>
    )
  }
}

export default StampPad
