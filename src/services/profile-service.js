import TokenService from './token-service'
import config from '../config'

const ProfilesService ={
  getProfiles (props) {
    return fetch(`${config.API_ENDPOINT}/profiles`, {
      headers: {
        authorization : `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(
      props
    )
  }
}

export default ProfilesService