import axios from 'axios'
import { convertedVapidKey } from './config'

export const getSchedule = ({token, uID}) => {
  return new Promise((resolve, reject) => {
    axios('notify/getSchedule', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {uID}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const setSchedules = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('notify/setSchedules', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const setStatus = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('notify/setStatus', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const setPlayerId = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('notify/setPlayerId', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export default function subscribePush () {
  console.log('subscribing ....')
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        // console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
      });
  }

  return new Promise((resolve, reject) => {
    navigator.serviceWorker.ready.then(registration => {
      if (!registration.pushManager) {
        alert('Push Unsupported')
        return
      }
      registration.pushManager
        .subscribe({
          userVisibleOnly: true, //Always display notifications
          applicationServerKey: convertedVapidKey,
        })
        .then(subscription => axios.post('/api/common/subscribe', subscription).then(() => resolve()))
        .catch(err => {
          console.error('Push subscription error: ', err)
          reject()
        })
    })
  }).catch((e) => {
    console.log('error===> ', e)
  })
}

export function unsubscribePush () {
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          return
          //If there isn't a subscription, then there's nothing to do
        }
        subscription
          .unsubscribe()
          .then(() => axios.post('/api/common/unsubscribe'))
          .catch(err => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}
