import TokenService from './token-service'
import config from '../config'

const ShareService = {
  getShares() {
    return fetch(`${config.API_ENDPOINT}/shares`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  getSharedTemplates(templateId) {
    return fetch(`${config.API_ENDPOINT}/shares/templates/${templateId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  deleteSharedTemplate(templateId) {
    return fetch(`${config.API_ENDPOINT}/shares/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).catch((error) => {
      console.error({ error })
    })
  },

  getSharedProfiles(templateId) {
    return fetch(`${config.API_ENDPOINT}/shares/profiles/${templateId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  getSharedStamps(templateId) {
    return fetch(`${config.API_ENDPOINT}/shares/stamps/${templateId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  getShareables() {
    return fetch(`${config.API_ENDPOINT}/shareables`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  addShareables(template_id) {
    return fetch(`${config.API_ENDPOINT}/shareables/${template_id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        template_id: template_id,
      }),
    })
  },
}

export default ShareService