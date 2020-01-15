import TokenService from './token-service'
import config from '../config'

const TemplateService ={
  getTemplates () {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      headers: {
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
  
}

export default TemplateService