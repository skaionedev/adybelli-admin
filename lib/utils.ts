export function htmldecode(str?: string): string {
  if (!process.browser) return ''
  var txt = document.createElement('textarea')
  txt.innerHTML = str || ''
  return txt.value
}

export const isObjectEmpty = (obj: any) => {
  try {
    if (!obj) throw new Error(`argument type is not object or in null value`)

    return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (error) {
    console.log(error)
  }
}

export function filterOutFalsyItems(obj: any): any {
  const resObj: any = {}
  for (const i in obj) {
    if (obj[i]) {
      resObj[i] = obj[i]
    }
  }
  return resObj
}

export function priceConverter(priceStr: string | number): string {
  const price = +priceStr
  const res = price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'TMT'
  })
  return res
}

type ResolutionType = 'DESKTOP' | 'MOBILE'

export function getResolution(): ResolutionType {
  if (process.browser) {
    return window.innerWidth <= 768 ? 'MOBILE' : 'DESKTOP'
  } else return 'DESKTOP'
}

export const formatDateDetail = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()

  const month = date.getMonth() + 1
  const monthString = String(month)
  const monthToSHow = monthString.length === 2 ? monthString : '0' + monthString

  const day = date.getDate()
  const dayString = String(day)
  const dayToShow = dayString.length === 2 ? dayString : '0' + dayString

  const hours = date.getHours()
  const hoursString = String(hours)
  const hoursToShow = hoursString.length === 2 ? hoursString : '0' + hoursString

  const minutes = date.getMinutes()
  const minutesString = String(minutes)
  const minutesToShow = minutesString.length === 2 ? minutesString : '0' + minutesString

  return `${hoursToShow}:${minutesToShow} - ${dayToShow}.${monthToSHow}.${year}`
}

export type TPaymetns = 'Наличные' | 'Терминал' | 'Онлайн'

export function convertPaymentTypesToString(type: number): TPaymetns {
  if (type === 3) return 'Онлайн'
  else if (type === 2) return 'Терминал'
  else return 'Наличные'
}
