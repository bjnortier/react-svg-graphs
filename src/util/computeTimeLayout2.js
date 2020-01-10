import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import subHours from 'date-fns/subHours'
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

const endOfDay = (date) => {
  let eod = new Date(date)
  eod.setUTCHours(0)
  eod.setUTCMinutes(0)
  eod.setUTCSeconds(0)
  if (date.getUTCHours() !== 0) {
    eod = addDays(eod, 1)
  }
  return eod
}

export default (maxValue, period) => {
  const yearMatch = /([0-9]+)y/.exec(period)
  const dayMatch = /([0-9]+)d/.exec(period)
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
    } else if (n === 3) {
      tickLabelRem = 6
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
  } else if (dayMatch) {
    const maxAxisDate = endOfDay(maxValue)
    const n = parseInt(dayMatch[1])
    const minAxisDate = subDays(maxAxisDate, n)
    const tickDates = range(n * 24 + 1).map(x => subHours(maxAxisDate, x)).reverse()
    console.log('min', minAxisDate.toISOString())
    console.log('max', maxAxisDate.toISOString())
    return {
      tickDates,
      max: maxAxisDate,
      min: minAxisDate,
      tickLabelTest: (tickDate, width) => {
        if (width <= 480 && n > 3) {
          return tickDate.getUTCHours() % 12 === 0
        } else {
          return tickDate.getUTCHours() % 6 === 0
        }
      },
      tickLabelFormat: width => 'H',
      contextLabelTest: (tickDate, width) => {
        if (width <= 480 && n > 3) {
          return tickDate.getUTCHours() === 0
        } else {
          return tickDate.getUTCHours() === 0 && tickDate.getUTCDate() % 2 === 0
        }
      },
      contextLabelFormat: 'yyyy/M/d'
    }
  } else {
    throw Error(`period not supported: ${period}`)
  }
}
