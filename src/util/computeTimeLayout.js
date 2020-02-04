import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import subDays from 'date-fns/subDays'
import subHours from 'date-fns/subHours'
import subMinutes from 'date-fns/subMinutes'
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import addMonths from 'date-fns/addMonths'
import { range } from 'lodash'

export const endOfMonth = (date) => {
  let eom = new Date(date)
  if ((eom.getUTCDate() === 1) &&
    (eom.getUTCHours() === 0) &&
      (eom.getUTCMinutes() === 0) &&
      (eom.getUTCSeconds() === 0) &&
      (eom.getUTCMilliseconds() === 0)) {
    return eom
  }
  eom.setUTCDate(1)
  eom.setUTCHours(0)
  eom.setUTCMinutes(0)
  eom.setUTCSeconds(0)
  eom.setUTCMilliseconds(0)
  eom = addMonths(eom, 1)
  return eom
}

export const endOfDay = (date) => {
  let eod = new Date(date)
  if ((eod.getUTCHours() === 0) &&
      (eod.getUTCMinutes() === 0) &&
      (eod.getUTCSeconds() === 0) &&
      (eod.getUTCMilliseconds() === 0)) {
    return eod
  }
  eod.setUTCHours(0)
  eod.setUTCMinutes(0)
  eod.setUTCSeconds(0)
  eod.setUTCMilliseconds(0)
  eod = addDays(eod, 1)
  return eod
}

export const endOfHour = (date) => {
  let eoh = new Date(date)
  if ((eoh.getUTCMinutes() === 0) &&
      (eoh.getUTCSeconds() === 0) &&
      (eoh.getUTCMilliseconds() === 0)) {
    return eoh
  } else {
    eoh.setUTCMinutes(0)
    eoh.setUTCSeconds(0)
    eoh.setUTCMilliseconds(0)
    eoh = addHours(eoh, 1)
    return eoh
  }
}

/**
 * Number of days since 1970 epoch.
 */
const daySinceEpoch = (date) => {
  var start = new Date(0)
  var diff = (date - start)
  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export default (maxValue, period) => {
  const yearMatch = /^([0-9]+)y$/.exec(period)
  const weekMatch = /^([0-9]+)w$/.exec(period)
  const dayMatch = /^([0-9]+)d$/.exec(period)
  const hourMatch = /^([0-9]+)h$/.exec(period)
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
  } else if (weekMatch) {
    const maxAxisDate = endOfDay(maxValue)
    const n = parseInt(weekMatch[1])
    const minAxisDate = subDays(maxAxisDate, n * 7)
    const tickDates = range(n * 28 + 1).map(x => subHours(maxAxisDate, x * 24)).reverse()
    return {
      tickDates,
      max: maxAxisDate,
      min: minAxisDate,
      tickLabelTest: (tickDate, width) => {
        if (width >= 480 && n <= 2) {
          return true
        } else {
          return daySinceEpoch(tickDate) % 2 === 0
        }
      },
      tickLabelFormat: width => 'd',
      contextLabelTest: (tickDate, width) => {
        if (n > 2) {
          return daySinceEpoch(tickDate) % 14 === 0
        } else {
          return daySinceEpoch(tickDate) % 7 === 0
        }
      },
      contextLabelFormat: 'yyyy/M/d'
    }
  } else if (dayMatch) {
    const maxAxisDate = endOfDay(maxValue)
    const n = parseInt(dayMatch[1])
    const minAxisDate = subDays(maxAxisDate, n)
    const tickDates = range(n * 24 + 1).map(x => subHours(maxAxisDate, x)).reverse()
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
          return tickDate.getUTCHours() === 0 && daySinceEpoch(tickDate) % 2 === 0
        }
      },
      contextLabelFormat: 'yyyy/M/d'
    }
  } else if (hourMatch) {
    const maxAxisDate = endOfHour(maxValue)
    const n = parseInt(hourMatch[1])
    const minAxisDate = subHours(maxAxisDate, n)
    const tickDates = range(n * 2 + 1).map(x => subMinutes(maxAxisDate, x * 30)).reverse()
    return {
      tickDates,
      max: maxAxisDate,
      min: minAxisDate,
      tickLabelTest: (tickDate, width) => {
        if (width >= 480 && n <= 24) {
          return tickDate.getUTCMinutes() === 0
        } else if (width >= 320 && n <= 24) {
          return tickDate.getUTCMinutes() === 0 && tickDate.getUTCHours() % 2 === 0
        } else {
          return tickDate.getUTCMinutes() === 0 && tickDate.getUTCHours() % 4 === 0
        }
      },
      tickLabelFormat: () => {
        return n <= 12 ? 'HH:mm' : 'HH'
      },
      contextLabelTest: (tickDate, width) => {
        return tickDate.getUTCHours() === 0 && tickDate.getUTCMinutes() === 0
      },
      contextLabelFormat: 'yyyy/M/d'
    }
  } else {
    throw Error(`period not supported: ${period}`)
  }
}
