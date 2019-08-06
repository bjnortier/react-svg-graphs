import timePeriods from './timePeriods'

export default (timestampMS, period) => {
  const periodInMS = timePeriods[period]
  return Math.ceil(timestampMS / periodInMS) * periodInMS
}
