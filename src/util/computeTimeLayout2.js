import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import { range } from 'lodash'

const endOfMonth = (date) => {
  const eom = new Date(date)
  eom.setUTCDate(1)
  eom.setUTCHours(0)
  eom.setUTCMinutes(0)
  eom.setUTCSeconds(0)
  if (eom.getUTCMonth() === 11) {
    eom.setUTCMonth(0)
    eom.setUTCFullYear(eom.getUTCFullYear() + 1)
  } else {
    eom.setUTCMonth(eom.getUTCMonth() + 1)
  }
  return eom
}

export default (maxValue, period) => {
  const yearMatch = /([0-9]+)y/.exec(period)
  if (yearMatch) {
    const maxAxisDate = endOfMonth(maxValue)
    const n = parseInt(yearMatch[1])
    const minAxisDate = subYears(maxAxisDate, n)
    const tickDates = range(n * 12 + 1).map(x => subMonths(maxAxisDate, x)).reverse()
    let tickLabelRem
    if (n === 1) {
      tickLabelRem = 1
    } else if (n === 2) {
      tickLabelRem = 3
    } else {
      tickLabelRem = 12
    }
    return {
      tickDates,
      max: maxAxisDate,
      min: minAxisDate,
      tickLabelTest: (tickDate, width) => tickDate.getUTCMonth() % tickLabelRem === 0,
      tickLabelFormat: width => 'M',
      contextLabelTest: tickDate => tickDate.getUTCMonth() === 0,
      contextLabelFormat: 'y'
    }
  } else {
    throw Error(`period not supported: ${period}`)
  }
}
