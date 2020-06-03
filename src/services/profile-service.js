import TokenService from './token-service'
import config from '../config'

const ProfilesService = {

  getProfiles() {
    return fetch(`${config.API_ENDPOINT}/profiles`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      // .then(props)
  },

  addProfile(props) {
    return fetch(`${config.API_ENDPOINT}/profiles`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: props.title,
        template_id: props.template_id,
        owner_id: props.owner_id
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  
  deleteProfile(profileId) {
    console.log('in ps deleteProfile', profileId)
    return fetch(`${config.API_ENDPOINT}/profiles/${profileId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).catch((error) => {
      console.error({ error })
    })
  },

  updateProfile(props) {
    console.log('in ts updateProfile', props)
    return fetch(`${config.API_ENDPOINT}/profiles/${props.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: props.title,
        owner_id: props.owner_id,
        id: props.id,
        template_id: props.template_id
      })
    })
  }
}

export default ProfilesService
