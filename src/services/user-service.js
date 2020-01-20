import TokenService from './token-service'
import config from '../config'


const UserService = {
  getUser(props) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then(console.log('props', props))
      .then(props)
  }
}
export default UserService
