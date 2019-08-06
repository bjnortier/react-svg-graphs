import timePeriods from './timePeriods'

export default (max, periodLabel, localOrUTC) => {
  const hr = 3600 * 1000
  const day = hr * 24
  const year = day * 365
  const min = max - timePeriods[periodLabel]
  const getDate = (date) => localOrUTC === 'local' ? date.getDate() : date.getUTCDate()
  const getHours = (date) => localOrUTC === 'local' ? date.getHours() : date.getUTCHours()
  const getMinutes = (date) => localOrUTC === 'local' ? date.getMinutes() : date.getUTCMinutes()
  switch (periodLabel) {
    case ('7y'): {
      const tickPeriod = year
      let max1 = new Date(`${new Date(max).getFullYear() + 1}`).getTime()
      let min = max - 7 * year
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 6,
        min,
        max: max1,
        tickLabelTest: (tickDate, width) => true,
        tickLabelFormat: (width) => '%y',
        contextLabelTest: (tickDate) => tickDate.getFullYear() === 2000,
        contextLabelFormat: '%C'
      }
    }
    case ('6y'): {
      const tickPeriod = year
      let max1 = new Date(`${new Date(max).getFullYear() + 1}`).getTime()
      let min = max - 6 * year
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 6,
        min,
        max: max1,
        tickLabelTest: (tickDate, width) => true,
        tickLabelFormat: (width) => '%y',
        contextLabelTest: (tickDate) => tickDate.getFullYear() === 2000,
        contextLabelFormat: '%C'
      }
    }
    case ('1mo'): {
      const tickPeriod = hr * 24
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 15,
        min,
        max,
        tickLabelTest: (tickDate, width) => {
          if (width < 440) {
            return (getDate(tickDate) % 3 === 1) &&
              (getDate(tickDate) < 30)
          } else {
            return (getDate(tickDate) % 2 === 1) &&
              (getDate(tickDate) < 30)
          }
        },
        tickLabelFormat: (width) => '%d',
        contextLabelTest: (tickDate) => (getDate(tickDate) === 1),
        contextLabelFormat: '%Y/%m'
      }
    }
    case ('1w'): {
      const tickPeriod = hr * 6
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 15,
        min,
        max,
        tickLabelTest: (tickDate, width) => {
          if (width < 500) {
            return (getHours(tickDate) % 24 === 0) &&
              (getDate(tickDate) % 2 === 1) &&
              (getDate(tickDate) < 30)
          } else {
            return (getHours(tickDate) % 24 === 0)
          }
        },
        tickLabelFormat: (width) => '%d/%m',
        contextLabelTest: (tickDate) => {
          return ((getHours(tickDate) === 0) &&
                  (getDate(tickDate) === 1) &&
                  (tickDate.getUTCMonth() === 0))
        },
        contextLabelFormat: '%Y'
      }
    }
    case ('2d'): {
      const tickPeriod = hr
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        min,
        max,
        tickLabelTest: (tickDate, width) => {
          if (width < 400) {
            return (getHours(tickDate) % 6 === 0)
          } else {
            return (getHours(tickDate) % 3 === 0)
          }
        },
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) => (getHours(tickDate) === 0),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('1d'):
    case ('24h'): {
      const tickPeriod = hr
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 24,
        min,
        max,
        tickLabelTest: (tickDate) => (getHours(tickDate) % 3 === 0),
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) => (getHours(tickDate) === 0),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('12h'): {
      const tickPeriod = hr / 2
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        min,
        max,
        tickLabelTest: (tickDate, width) => {
          if (width < 400) {
            return ((getHours(tickDate) % 2 === 0) &&
              (getMinutes(tickDate) === 0))
          } else {
            return ((getHours(tickDate) % 1 === 0) && (getMinutes(tickDate) === 0))
          }
        },
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) =>
          ((getHours(tickDate) === 0) && (getMinutes(tickDate) === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('6h'): {
      const tickPeriod = hr / 4
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        min,
        max,
        tickLabelTest: (tickDate) => (getMinutes(tickDate) === 0),
        tickLabelFormat: (width) => width >= 600 ? '%H:%M' : '%H',
        contextLabelTest: (tickDate) =>
          ((getHours(tickDate) === 0) && (getMinutes(tickDate) === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('3h'): {
      const tickPeriod = hr / 8
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        min,
        max,
        tickLabelTest: (tickDate, width) => (width >= 260)
          ? (getMinutes(tickDate) % 30 === 0)
          : (getMinutes(tickDate) === 0),
        tickLabelFormat: (width) => width >= 260 ? '%H:%M' : '%H',
        contextLabelTest: (tickDate) =>
          ((getHours(tickDate) === 0) && (getMinutes(tickDate) === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('1h'): {
      const tickPeriod = hr / 12
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 12,
        min,
        max,
        tickLabelTest: (tickDate, width) => (width >= 600)
          ? (getMinutes(tickDate) % 5 === 0)
          : (getMinutes(tickDate) % 15 === 0),
        tickLabelFormat: (width) => '%H:%M',
        contextLabelTest: (tickDate) =>
          ((getHours(tickDate) === 0) && (getMinutes(tickDate) === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    default: throw Error(`period not supported: ${periodLabel}`)
  }
}
