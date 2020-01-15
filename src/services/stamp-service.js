import TokenService from './token-service'
import config from '../config'

const StampsService ={
  getStamps () {
    return fetch(`${config.API_ENDPOINT}/stamps`, {
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

export default StampsService