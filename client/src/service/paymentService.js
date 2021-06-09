import axios from 'axios'
// For Admin User
export const executePayWithPaypal = ({ token, data }) => {
  return new Promise((resolve, reject) => {
    axios('checkout/executePayWithPaypal', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
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
export const createPaymentWithPaypal = ({ token, _id, vtoken }) => {
  return new Promise((resolve, reject) => {
    axios('checkout/createPaymentWithPaypal', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: {
        _id,
        vtoken,
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

export const executePayWithStripe = ({ token, stripeToken, vtoken, _id, uID }) => {
  return new Promise((resolve, reject) => {
    axios('checkout/executePayWithStripe', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: {
        stripeToken,
        vtoken,
        _id,
        uID
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

export const verifyVoucherCode = ({ token, code }) => {
  return new Promise((resolve, reject) => {
    axios('checkout/verifyVoucherCode', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: { code },
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const verifyVoucherCodeStripe = ({ token, code }) => {
  return new Promise((resolve, reject) => {
    axios('checkout/verifyVoucherCodeStripe', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data: { code },
    })
      .then((res) => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
