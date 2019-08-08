import timePeriods from './timePeriods'

export default (timestampMS, period, divisions) => {
  const periodInMS = timePeriods[period] / divisions
  return Math.ceil(timestampMS / periodInMS) * periodInMS
}
