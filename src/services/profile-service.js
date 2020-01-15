import TokenService from './token-service'
import config from '../config'

const ProfilesService ={
  getProfiles () {
    return fetch(`${config.API_ENDPOINT}/profiles`, {
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

export default ProfilesService