export const config = {
  BASE_URL: 'http://127.0.0.1:8003/api/',
  // BASE_URL: 'http://51.89.166.102/api/',
  // for client
  // BASE_URL: 'https://crio-test.herokuapp.com/api/',
  // for mine
  // BASE_URL: 'https://protected-gorge-63284.herokuapp.com/api/'
}

export const fridgeStatus = ['Active', 'Cleaning', 'Maintenance', 'Turn Off']
export const fridgeStatusData = [
  {
    title: 'Active',
    index: 0,
  },
  {
    title: 'Cleaning',
    index: 1,
  },
  {
    title: 'Maintenance',
    index: 2,
  },
  {
    title: 'Turn Off',
    index: 3,
  },
]

export const statusIcons = ['snowflake-variant', 'snowflake-variant', 'snowflake-variant', 'snowflake-variant']

export const statusColors = ['success', 'cyan', 'yellow', 'red']

export const weekdaysConst = [
  {
    title: 'Domenica',
    index: 0,
  },
  {
    title: 'Lunedì',
    index: 1,
  },
  {
    title: 'Martedì',
    index: 2,
  },
  {
    title: 'Mercoledì',
    index: 3,
  },
  {
    title: 'Giovedi',
    index: 4,
  },
  {
    title: 'Venerdì',
    index: 5,
  },
  {
    title: 'Sabato',
    index: 6,
  },
]

export const periodConst = [
  {title: "Days", unit: 'day'},
  {title: "Weeks", unit: 'week'},
  {title: "Months", unit: 'month'},
  {title: "Years", unit: 'year'},
]

export const periodUnitConst = {
  day: 1,
  week: 7,
  month: 30,
  year: 365
}

const vapidPublicKey = "BGNJnBmEIEY6iz-UWWupl5wRre_IGBuSkV8XqXhYun3QSm8DaKEiP2cb4c33l8SRKxlsoVfD-7ewfmTni9rhZjY"
export const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
