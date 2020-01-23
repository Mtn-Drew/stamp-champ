import TokenService from './token-service'
import config from '../config'

const StampsService ={
  getStamps (props) {
    return fetch(`${config.API_ENDPOINT}/stamps`, {
      headers: {
        authorization : `Bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(props)
  },
  addStamps(props) {
    return fetch(`${config.API_ENDPOINT}/stamps`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: props.title,
        profile_id: props.profile_id,
        template_id:props.template_id,
        owner_id: props.owner_id,
        content: props.content
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  deleteStamp(stampId) {
    console.log('in ss deleteStamp', stampId);
    return fetch(`${config.API_ENDPOINT}/stamps/${stampId}`, {
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

export default StampsService