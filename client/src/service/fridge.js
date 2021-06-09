import axios from 'axios';

export const getAllFridges = ({token, uID}) => {
  return new Promise((resolve, reject) => {
    axios('user/getAllFridges', {
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

export const getFridgeTypes = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('common/getFridgeTypes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const createFridge = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('user/createFridge', {
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

export const deleteFridge = ({token, _id, uID}) => {
  return new Promise((resolve, reject) => {
    axios('user/deleteFridge', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {_id, uID}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const updateFridge = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('user/updateFridge', {
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

export const updateFridgeActivaion = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('user/updateFridgeActivaion', {
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

export const updateHistory = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('user/updateHistory', {
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

export const updateHistoryForToday = ({token, uID}) => {
  return new Promise((resolve, reject) => {
    axios('user/updateHistoryForToday', {
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
