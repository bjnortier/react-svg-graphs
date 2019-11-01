import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import { range } from 'lodash'

export default (maxValue, period) => {
  switch (period) {
    case '1y': {
      const maxAxisDate = new Date(maxValue)
      maxAxisDate.setUTCDate(1)
      maxAxisDate.setUTCHours(0)
      maxAxisDate.setUTCMinutes(0)
      maxAxisDate.setUTCSeconds(0)
      if (maxAxisDate.getUTCMonth() === 11) {
        maxAxisDate.setUTCMonth(0)
        maxAxisDate.setUTCFullYear(maxAxisDate.getUTCFullYear() + 1)
      } else {
        maxAxisDate.setUTCMonth(maxAxisDate.getUTCMonth() + 1)
      }
      console.log('End of month:', maxAxisDate.toISOString())

      const minAxisDate = subYears(maxAxisDate, 1)
      const tickDates = range(13).map(x => subMonths(maxAxisDate, x)).reverse()
      return {
        tickDates,
        max: maxAxisDate,
        min: minAxisDate,
        tickLabelTest: (tickDate, width) => true,
        tickLabelFormat: width => 'M',
        contextLabelTest: tickDate => tickDate.getMonth() === 0,
        contextLabelFormat: 'y'
      }
    }
    default:
      throw Error(`period not supported: ${period}`)
  }
}
