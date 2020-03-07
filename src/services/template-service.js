import TokenService from './token-service'
import config from '../config'

const TemplateService = {

  getTemplates() {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      // .then(console.log('ts props->', props))
      // .then(props)
  },

  getAwaitTemplates() {
    console.log('in getAwaitTemplates ')
    async function fetchTemplates() {
      const res = await fetch(`${config.API_ENDPOINT}/templates`, {
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      const data = await res.json()
      //  return await res.json(props.value)
      console.log('await templates', data)
      res.data = data
      return data
    }
    fetchTemplates()
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
        //owner_id: props.owner_id
      })
    })
    .then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },

  deleteTemplate(templateId) {
    console.log('in ts deleteTemplate', templateId)
    return fetch(`${config.API_ENDPOINT}/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).catch((error) => {
      console.error({ error })
    })
  },

  updateTemplate(props) {
    console.log('in ts updateTemplate', props)
    return fetch(`${config.API_ENDPOINT}/templates/${props.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: props.title,
        owner_id: props.owner_id,
        id: props.id
      })
    }).catch((error) => {
      console.error({ error })
    })
  }

}
export default TemplateService
