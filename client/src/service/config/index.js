export const config = {
  // BASE_URL: 'http://127.0.0.1:9000/api/',
  // BASE_URL: 'http://localhost:8000/api/',
  // BASE_URL: 'http://localhost:8003/api/',

  BASE_URL: 'https://apps.crioon.com/api/',
  
}
// console.log('url', config.BASE_URL)

export const fridgeStatus = ["Attivo", "Attivo/Pulizia", "Manutenzione", "Spento"]
export const fridgeStatusData = [
  {
    title: 'Attivo',
    index: 0,
  },
  {
    title: 'Attivo/Pulizia',
    index: 1,
  },
  {
    title: 'Manutenzione',
    index: 2,
  },
  {
    title: 'Spento',
    index: 3,
  },
]

export const statusIcons = ['mdi-snowflake-variant','mdi-spray-bottle', 'mdi-air-conditioner', 'mdi-air-conditioner']

export const statusColors = ['success', 'cyan', 'yellow', 'red']

export const weekdaysConst = [

  {
    title: 'Lunedì',
    index: 0,
  },
  {
    title: 'Martedì',
    index: 1,
  },
  {
    title: 'Mercoledì',
    index: 2,
  },
  {
    title: 'Giovedì',
    index: 3,
  },
  {
    title: 'Venerdì',
    index: 4,
  },
  {
    title: 'Sabato',
    index: 5,
  },
  {
    title: 'Domenica',
    index: 6,
  },
]

export const periodConst = [
  {title: "Giorni", unit: 'day'},
  {title: "Settimane", unit: 'week'},
  {title: "Mese", unit: 'month'},
  {title: "Anno", unit: 'year'},
]

export const periodTitle = {
  day: 'Giorni',
  week: 'Settimane',
  month: 'Mese',
  year: 'Anno',
}

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

export const paymentInfo = {
  stripeDevAppId: 'pk_test_51HDpb6BE9q7fomtlvcHN87GHvMwpDgbT8N1aKLUB5NyExTxkfo6NW9Nc77PzlQBV6sQbWw92HKgyfDXyE8zYBKd900toLJFa79',
  stripeProAppId: '',
  paypalSandbox: 'AQ4cbpmlGDKNz3iDpDvFAoiGFhfS73UZJiHBjRBRZ1FLQblD1fBv6R4HYjjjXdrVj-ka39NUXkTUQAvV',
  paypalProduction: ''
}
