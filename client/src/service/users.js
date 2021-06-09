import axios from 'axios';

export const getAllUsers = ({ token }) => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllUsers', {
      method: 'post',
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

export const getAllAdmins = ({ token }) => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllAdmins', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: { token }
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const createNewUser = ({ token, data }) => {
  return new Promise((resolve, reject) => {
    axios('admin/createNewUser', {
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

export const deleteAUser = ({ token, _id }) => {
  return new Promise((resolve, reject) => {
    axios('admin/deleteUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: { token, _id }
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const createNewAdmin = ({ token, data }) => {
  return new Promise((resolve, reject) => {
    axios('admin/createNewAdmin', {
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
// Change Status of a user
export const setUserStatus = ({ token, status, _id }) => {
  return new Promise((resolve, reject) => {
    axios('admin/setUserStatus', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: { status, _id }
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

// Change Email & Password of a user
export const resetEmailPassword = ({ token, data }) => {
  return new Promise((resolve, reject) => {
    axios('admin/resetEmailPassword', {
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

export const getAllEmailTemplates = () => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllEmailTemplates', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
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

export const createEmailTemplate = (data) => {
  return new Promise((resolve, reject) => {
    axios('admin/createEmailTemplate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export const updateEmailTemplate = (data) => {
  return new Promise((resolve, reject) => {
    axios('admin/updateEmailTemplate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const getEmailTemplatesByName = (data) => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllEmailTemplatesByName', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}