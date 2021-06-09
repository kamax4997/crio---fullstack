import axios from 'axios'
import {BehaviorSubject} from 'rxjs'
import {router} from '../router'
import subscribePush from './common'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get getCurrentUser() {
    return currentUserSubject.value
  },
}

export const loginApi = (user) => {
  return new Promise((resolve, reject) => {
    axios('auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: user,
    })
      .then((res) => {
        // console.log(res)
        if (res.status !== 201) {
          // console.log(res, res.data.data.currentUser)
          localStorage.setItem('currentUser', JSON.stringify(res.data.data.currentUser))
          // this.$store.commit('SET_CURRENT_USER', res.data.data.currentUser)
          currentUserSubject.next(res.data.data.currentUser)

          /*subscribePush().then(() => {
            console.log('subscribePush================>')
            self.addEventListener('push', event => {
              const data = event.data.json()
              const { title } = data
              console.log(data)

              const body = {
                body: data.body,
                icon: data.icon,
              }

              event.waitUntil(self.registration.showNotification(title, body))
            })
          }).catch(e => {
            console.log('error===> ', e)
          })*/

        }
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const getCurrentUser = (token) => {
  return new Promise((resolve, reject) => {
    axios('auth/getCurrentUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: {token: token},
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const checkExist = ({name, email, password}) => {
  return new Promise((resolve, reject) => {
    axios('auth/checkExist', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const register = (data) => {
  return new Promise((resolve, reject) => {
    axios('auth/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const canResetPassword = (data) => {
  return new Promise((resolve, reject) => {
    axios('auth/canResetPassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data.token,
      },
      data: data,
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const resetPassword = (data) => {
  return new Promise((resolve, reject) => {
    axios('auth/resetPassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data.token,
      },
      data: data,
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios('auth/forgotPassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {email: email},
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const reNewPassword = (data) => {
  return new Promise((resolve, reject) => {
    axios('auth/reNewPassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
};

export const canUpdateProfile = ({token, oldEmail}) => {
  return new Promise((resolve, reject) => {
    axios('auth/canUpdateProfile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: {
        token,
        oldEmail,
      },
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const updateProfile = ({profile}) => {
  return new Promise((resolve, reject) => {
    axios('auth/updateProfile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': profile.token,
      },
      data: {
        profile,
      },
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}


function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}
