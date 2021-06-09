import axios from 'axios';
// For Admin User
export const getAllPackages = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllPackages', {
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

export const createMainPackage = ({token, newPackage}) => {
  return new Promise((resolve, reject) => {
    axios('admin/createMainPackage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {newPackage}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const deleteMainPackage = ({token, _id}) => {
  return new Promise((resolve, reject) => {
    axios('admin/deleteMainPackage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {_id}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

export const updateMainPackage = ({token, mainPackage}) => {
  return new Promise((resolve, reject) => {
    axios('admin/updateMainPackage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {mainPackage}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

// get number for fridges for a certain user
export const getNumberFridges = ({token, uID}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getNumberFridges', {
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
// Increase Number of Fridges for a certain user
export const upgradePackage = ({token, uID, numberFridges}) => {
  return new Promise((resolve, reject) => {
    axios('admin/upgradePackage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {uID, numberFridges}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}

// Create Voucher Code for some packages
export const createVoucherCode = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('admin/createVoucherCode', {
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

// Create Voucher Code for some packages
export const updateVoucherCode = ({token, data}) => {
  return new Promise((resolve, reject) => {
    axios('admin/updateVoucherCode', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {voucherCode: data}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}
export const deleteVoucherCode = ({token, _id}) => {
  return new Promise((resolve, reject) => {
    axios('admin/deleteVoucherCode', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {_id}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}
export const getAllVoucherCodes = ({token}) => {
  return new Promise((resolve, reject) => {
    axios('admin/getAllVoucherCodes', {
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
export const getMainPackages = ({token,uID}) => {
  return new Promise((resolve, reject) => {
    axios('user/getMainPackages', {
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
export const getMainPackageByID = ({token,pID}) => {
  return new Promise((resolve, reject) => {
    axios('user/getMainPackageByID', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: {pID}
    })
      .then((res) => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
  })
}
