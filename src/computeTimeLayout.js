import timePeriods from './timePeriods'

const tzOffset = new Date().getTimezoneOffset()

export default (maxWindowT, periodLabel) => {
  const hr = 3600 * 1000
  const minWindowT = maxWindowT - timePeriods[periodLabel]
  switch (periodLabel) {
    case ('1mo'): {
      const tickPeriod = hr * 24
      let minT = Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod
      let maxT = Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod
      minT += tzOffset * 60 * 1000
      maxT += tzOffset * 60 * 1000
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 15,
        minT,
        maxT,
        tickLabelTest: (tickDate, width) => {
          if (width < 440) {
            return (tickDate.getDate() % 3 === 1) &&
              (tickDate.getDate() < 30)
          } else {
            return (tickDate.getDate() % 2 === 1) &&
              (tickDate.getDate() < 30)
          }
        },
        tickLabelFormat: (width) => '%d',
        contextLabelTest: (tickDate) => (tickDate.getDate() === 1),
        contextLabelFormat: '%Y/%m'
      }
    }
    case ('1w'): {
      const tickPeriod = hr * 6
      let minT = Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod
      let maxT = Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod
      minT += tzOffset * 60 * 1000
      maxT += tzOffset * 60 * 1000
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 15,
        minT,
        maxT,
        tickLabelTest: (tickDate, width) => {
          if (width < 500) {
            return (tickDate.getHours() % 24 === 0) &&
              (tickDate.getDate() % 2 === 1) &&
              (tickDate.getDate() < 30)
          } else {
            return (tickDate.getHours() % 24 === 0)
          }
        },
        tickLabelFormat: (width) => '%m/%d',
        contextLabelTest: (tickDate) => {
          return ((tickDate.getHours() === 0) &&
                  (tickDate.getDate() === 1) &&
                  (tickDate.getMonth() === 0))
        },
        contextLabelFormat: '%Y'
      }
    }
    case ('2d'): {
      const tickPeriod = hr
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate, width) => {
          if (width < 400) {
            return (tickDate.getHours() % 6 === 0)
          } else {
            return (tickDate.getHours() % 3 === 0)
          }
        },
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) => (tickDate.getHours() === 0),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('1d'):
    case ('24h'): {
      const tickPeriod = hr
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate) => (tickDate.getHours() % 3 === 0),
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) => (tickDate.getHours() === 0),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('12h'): {
      const tickPeriod = hr / 2
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate, width) => {
          if (width < 400) {
            return ((tickDate.getHours() % 2 === 0) &&
              (tickDate.getMinutes() === 0))
          } else {
            return ((tickDate.getHours() % 1 === 0) && (tickDate.getMinutes() === 0))
          }
        },
        tickLabelFormat: (width) => '%H',
        contextLabelTest: (tickDate) =>
          ((tickDate.getHours() === 0) && (tickDate.getMinutes() === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('6h'): {
      const tickPeriod = hr / 4
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate) => (tickDate.getMinutes() === 0),
        tickLabelFormat: (width) => width >= 600 ? '%H:%M' : '%H',
        contextLabelTest: (tickDate) =>
          ((tickDate.getHours() === 0) && (tickDate.getMinutes() === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('3h'): {
      const tickPeriod = hr / 8
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 26,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate, width) => (width >= 260)
          ? (tickDate.getMinutes() % 30 === 0)
          : (tickDate.getMinutes() === 0),
        tickLabelFormat: (width) => width >= 260 ? '%H:%M' : '%H',
        contextLabelTest: (tickDate) =>
          ((tickDate.getHours() === 0) && (tickDate.getMinutes() === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    case ('1h'): {
      const tickPeriod = hr / 12
      return {
        timeAxisTickPeriod: tickPeriod,
        numTicks: 14,
        minT: Math.floor((minWindowT - tickPeriod) / tickPeriod) * tickPeriod,
        maxT: Math.ceil((maxWindowT + tickPeriod) / tickPeriod) * tickPeriod,
        tickLabelTest: (tickDate, width) => (width >= 600)
          ? (tickDate.getMinutes() % 5 === 0)
          : (tickDate.getMinutes() % 15 === 0),
        tickLabelFormat: (width) => '%H:%M',
        contextLabelTest: (tickDate) =>
          ((tickDate.getHours() === 0) && (tickDate.getMinutes() === 0)),
        contextLabelFormat: '%Y/%m/%d'
      }
    }
    default: throw Error(`period not supported: ${periodLabel}`)
  }
}
