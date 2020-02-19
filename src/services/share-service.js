import TokenService from './token-service'
import config from '../config'

const ShareService = {
  getShares() {
    return fetch(`${config.API_ENDPOINT}/shares`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      // .then(console.log('shares props->', props))
      // .then(props)

  },

  getSharedTemplates(templateId) {
    console.log('in ss getSharedTemplates')
    return fetch(`${config.API_ENDPOINT}/shares/templates/${templateId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  getSharedProfiles(templateId) {
    console.log('in ss getSharedProfiles');
    return fetch(`${config.API_ENDPOINT}/shares/profiles/${templateId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
        
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      // .then(console.log('props-->', props))
      // .then(props)
  },

  getStamps(props) {
    return fetch(`${config.API_ENDPOINT}/shares/stamps/`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then(console.log('props-->', props))
      .then(props)
  }
}

export default ShareService
