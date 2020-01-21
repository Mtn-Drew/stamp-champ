import TokenService from './token-service'
import config from '../config'

const TemplateService = {
  getTemplates(props) {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then(console.log('props', props))
      .then(props)
  },
  addTemplate(props) {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      method: 'POST',

      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: props.title,
        owner_id: props.owner_id
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  deleteTemplate(templateId) {
    console.log('in ts deleteTemplate', templateId);
    return fetch(`${config.API_ENDPOINT}/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json(204)
    )
    .catch((error) => {
      console.error({ error })
    })
  },
}
export default TemplateService
