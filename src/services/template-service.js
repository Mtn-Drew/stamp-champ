import TokenService from './token-service'
import config from '../config'

const TemplateService = {
  getTemplates (props) {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      headers: {
        authorization : `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(console.log(props)
    )
    .then(props)
  }
//   props.dataCallBack=json
//   console.log(json);
}

export default TemplateService