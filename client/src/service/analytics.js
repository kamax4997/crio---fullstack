import axios from 'axios';

// Admin getTotalUsers
export const getTotalUsers = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getTotalUsers', {
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

export const getEnabledUsers = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getEnabledUsers', {
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

export const getActiveUsers = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getActiveUsers', {
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

export const getTotalSales = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getTotalSales', {
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

export const getRegisteredUsersThisWeek = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getRegisteredUsersThisWeek', {
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

export const getSalesThisWeek = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getSalesThisWeek', {
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

export const getPurchaseHistory = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getPurchaseHistory', {
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

// For Users
export const getFridgeHistory = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('user/getHistory', {
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

export const sendReportByEmail = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('common/sendReportByEmail', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
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

